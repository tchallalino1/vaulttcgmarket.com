import { NextResponse } from 'next/server';
import { getAllPokemon, createPokemon } from '@/lib/admin/store';
import { Pokemon } from '@/types';

export async function GET() {
  const pokemon = getAllPokemon();
  return NextResponse.json(pokemon);
}

export async function POST(request: Request) {
  const body = await request.json();
  const p: Pokemon = {
    id: `pokemon-${Date.now()}`,
    name: body.name || '',
    slug: body.slug || body.name?.toLowerCase().replace(/\s+/g, '-') || '',
    image: body.image || '',
    description: body.description,
    cardCount: Number(body.cardCount) || 0,
    pokemonTcgCardId: body.pokemonTcgCardId,
    popular: body.popular || false,
  };
  const created = createPokemon(p);
  return NextResponse.json(created, { status: 201 });
}
