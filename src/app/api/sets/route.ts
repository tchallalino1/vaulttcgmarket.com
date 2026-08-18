import { NextResponse } from 'next/server';
import { getAllSets, createSet } from '@/lib/admin/store';
import { PokemonSet } from '@/types';

export async function GET() {
  const sets = await getAllSets();
  return NextResponse.json(sets);
}

export async function POST(request: Request) {
  const body = await request.json();
  const set: PokemonSet = {
    id: `set-${Date.now()}`,
    name: body.name || '',
    slug: body.slug || body.name?.toLowerCase().replace(/\s+/g, '-') || '',
    logo: body.logo,
    image: body.image,
    releaseDate: body.releaseDate || '',
    totalCards: Number(body.totalCards) || 0,
    series: body.series,
  };
  const created = await createSet(set);
  return NextResponse.json(created, { status: 201 });
}
