import { NextResponse } from 'next/server';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.json();

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

  return NextResponse.json(result);
}
