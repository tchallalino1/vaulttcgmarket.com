import { NextResponse } from 'next/server';
import { getProductStats } from '@/lib/admin/store';

export async function GET() {
  const stats = await getProductStats();
  return NextResponse.json(stats);
}
