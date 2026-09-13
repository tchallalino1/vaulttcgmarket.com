import { NextResponse } from 'next/server';
import { searchTcgdexCards } from '@/lib/tcgdex';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const limit = searchParams.get('limit') || '20';
  
  if (!q) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  try {
    const cards = await searchTcgdexCards(q, parseInt(limit));
    return NextResponse.json({ cards });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
