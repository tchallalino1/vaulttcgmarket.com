import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const pageSize = searchParams.get('pageSize') || '10';

  try {
    const headers: Record<string, string> = {};
    if (process.env.POKEMON_TCG_API_KEY) {
      headers['X-Api-Key'] = process.env.POKEMON_TCG_API_KEY;
    }

    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(q)}&pageSize=${pageSize}`,
      { headers, next: { revalidate: 60 } }
    );

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch from Pokemon TCG API' }, { status: 500 });
  }
}
