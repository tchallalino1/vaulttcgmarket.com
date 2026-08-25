import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set — skipping email');
    return { success: false, message: 'Email service not configured' };
  }

  const itemsHtml = data.items
    .map(item => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#333;">${item.name}</td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#333;text-align:center;">${item.quantity}</td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#333;text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `)
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:#0a0a0a;padding:24px 32px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">VAULT</span>
            <span style="background:#dc2626;color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;">TCG</span>
          </div>
          <div style="color:#666;font-size:9px;text-transform:uppercase;letter-spacing:2px;margin-top:2px;">MARKET</div>
        </div>

        <!-- Success Banner -->
        <div style="background:#f0fdf4;padding:32px;text-align:center;">
          <div style="width:48px;height:48px;background:#22c55e;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
            <span style="color:#fff;font-size:24px;">✓</span>
          </div>
          <h1 style="margin:0;font-size:24px;font-weight:800;color:#0a0a0a;">ORDER CONFIRMED!</h1>
          <p style="margin:8px 0 0;color:#666;font-size:14px;">Thank you for your purchase, ${data.customerName}.</p>
        </div>

        <!-- Order Details -->
        <div style="padding:32px;">
          <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 4px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;">Order Number</p>
            <p style="margin:0;font-size:18px;font-weight:700;color:#0a0a0a;">#${data.orderNumber}</p>
          </div>

          <!-- Items -->
          <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:1px;">Order Items</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead>
              <tr>
                <th style="padding:0 0 12px;text-align:left;font-size:12px;color:#999;font-weight:500;border-bottom:2px solid #eee;">Product</th>
                <th style="padding:0 0 12px;text-align:center;font-size:12px;color:#999;font-weight:500;border-bottom:2px solid #eee;">Qty</th>
                <th style="padding:0 0 12px;text-align:right;font-size:12px;color:#999;font-weight:500;border-bottom:2px solid #eee;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <!-- Totals -->
          <div style="border-top:2px solid #eee;padding-top:16px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="font-size:14px;color:#666;">Subtotal</span>
              <span style="font-size:14px;color:#333;">$${data.subtotal.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="font-size:14px;color:#666;">Shipping</span>
              <span style="font-size:14px;color:#333;">${data.shipping === 0 ? 'FREE' : '$' + data.shipping.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:2px solid #eee;">
              <span style="font-size:16px;font-weight:700;color:#0a0a0a;">Total</span>
              <span style="font-size:16px;font-weight:700;color:#0a0a0a;">$${data.total.toFixed(2)}</span>
            </div>
          </div>

          <!-- Shipping Address -->
          <div style="margin-top:24px;background:#f9fafb;border-radius:12px;padding:20px;">
            <h2 style="margin:0 0 8px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:1px;">Shipping To</h2>
            <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">
              ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
              ${data.shippingAddress.address}<br>
              ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zip}
            </p>
          </div>

          <!-- What's Next -->
          <div style="margin-top:24px;background:#f5f3ff;border-radius:12px;padding:20px;">
            <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#7c3aed;">What&apos;s Next</h2>
            <ol style="margin:0;padding-left:20px;font-size:14px;color:#555;line-height:2;">
              <li>Your order is being prepared for shipment.</li>
              <li>You&apos;ll receive a tracking number once shipped.</li>
              <li>Track your order from your account dashboard.</li>
            </ol>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;padding:24px 32px;text-align:center;border-top:1px solid #eee;">
          <p style="margin:0;font-size:12px;color:#999;">© 2024 Vault TCG Market. All rights reserved.</p>
          <p style="margin:8px 0 0;font-size:12px;color:#999;">Questions? Contact us at support@vaulttcgmarket.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: 'Vault TCG Market <orders@vaulttcgmarket.com>',
      to: data.customerEmail,
      subject: `Order Confirmed — #${data.orderNumber}`,
      html,
    });
    return { success: true, message: 'Order confirmation email sent' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}
