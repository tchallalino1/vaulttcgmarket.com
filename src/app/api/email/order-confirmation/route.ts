import { NextResponse } from 'next/server';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📧 Email API called:', { orderNumber: body.orderNumber, email: body.customerEmail });

    const result = await sendOrderConfirmation({
      orderNumber: body.orderNumber,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      items: body.items || [],
      subtotal: body.subtotal || 0,
      shipping: body.shipping || 0,
      total: body.total || 0,
      shippingAddress: body.shippingAddress || {
        firstName: '', lastName: '', address: '', city: '', state: '', zip: '',
      },
    });

    console.log('📧 Email result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('📧 Email API error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
