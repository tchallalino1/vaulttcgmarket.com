import { NextResponse } from 'next/server';
import { searchScrydexSealed, getScrydexImageUrl } from '@/lib/scrydex';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const pageSize = searchParams.get('pageSize') || '20';

  if (!q) {
    return NextResponse.json({ error: 'Query required', products: [] });
  }

  try {
    const products = await searchScrydexSealed(q, parseInt(pageSize));
    const mapped = products.map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      imageUrl: getScrydexImageUrl(p.images, 'large'),
      expansion: p.expansion?.name || '',
      language: p.expansion?.language || '',
    }));
    return NextResponse.json({ products: mapped });
  } catch (error) {
    console.error('Scrydex search error:', error);
    return NextResponse.json({ error: 'Search failed', products: [] }, { status: 500 });
  }
}
