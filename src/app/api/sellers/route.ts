import { NextResponse } from 'next/server';
import { getAllSellers } from '@/lib/admin/store';

export async function GET() {
  const sellers = getAllSellers();
  return NextResponse.json(sellers);
}
