// Search data access - uses Prisma (Neon DB)
import { searchProducts as dbSearchProducts } from '@/lib/admin/db';
import { getAllPokemon as dbGetAllPokemon } from '@/lib/admin/db';
import { getAllSets as dbGetAllSets } from '@/lib/admin/db';
import { Product, Pokemon, PokemonSet } from '@/types';

export interface SearchResult {
  products: Product[];
  pokemon: Pokemon[];
  sets: PokemonSet[];
}

export async function searchAll(query: string): Promise<SearchResult> {
  const normalizedQuery = query.toLowerCase().trim();

  const [products, pokemon, sets] = await Promise.all([
    dbSearchProducts(query),
    dbGetAllPokemon(),
    dbGetAllSets(),
  ]);

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(normalizedQuery)
  );

  const filteredSets = sets.filter(s =>
    s.name.toLowerCase().includes(normalizedQuery) ||
    (s.series && s.series.toLowerCase().includes(normalizedQuery))
  );

  return { products, pokemon: filteredPokemon, sets: filteredSets };
}

export function getSearchSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();

  const pokemonNames = ['Charizard', 'Pikachu', 'Umbreon', 'Gengar', 'Mewtwo', 'Rayquaza', 'Eevee', 'Dragonite'];
  const setNames = ['Evolving Skies', 'Scarlet & Violet', 'Pokemon 151', 'Lost Origin', 'Silver Tempest', 'Crown Zenith', 'Shining Fates', 'Vivid Voltage'];

  const suggestions: string[] = [];

  pokemonNames.forEach(name => {
    if (name.toLowerCase().includes(q)) suggestions.push(name);
  });

  setNames.forEach(name => {
    if (name.toLowerCase().includes(q)) suggestions.push(name);
  });

  return [...new Set(suggestions)].slice(0, 10);
}
