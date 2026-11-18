import { NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus } from '@/lib/admin/db';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  if (body.status) {
    const updated = await updateOrderStatus(id, body.status);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  }
  return NextResponse.json({ error: 'No status provided' }, { status: 400 });
}
