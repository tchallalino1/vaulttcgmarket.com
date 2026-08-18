import { Product, Pokemon, PokemonSet } from '@/types';
import { seedProducts } from '@/seed/products';
import { seedPokemon } from '@/seed/pokemon';
import { seedSets } from '@/seed/sets';

export interface SearchResult {
  products: Product[];
  pokemon: Pokemon[];
  sets: PokemonSet[];
}

export function searchAll(query: string): SearchResult {
  const normalizedQuery = query.toLowerCase().trim();

  const products = seedProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      (product.pokemon && product.pokemon.toLowerCase().includes(normalizedQuery)) ||
      (product.set && product.set.toLowerCase().includes(normalizedQuery)) ||
      (product.cardNumber && product.cardNumber.toLowerCase().includes(normalizedQuery)) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  });

  const pokemon = seedPokemon.filter(p => {
    return (
      p.name.toLowerCase().includes(normalizedQuery) ||
      (p.description && p.description.toLowerCase().includes(normalizedQuery))
    );
  });

  const sets = seedSets.filter(set => {
    return (
      set.name.toLowerCase().includes(normalizedQuery) ||
      (set.series && set.series.toLowerCase().includes(normalizedQuery))
    );
  });

  return { products, pokemon, sets };
}

export function getSearchSuggestions(query: string): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  const suggestions: string[] = [];

  seedProducts.forEach(product => {
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(product.name);
    }
    if (product.pokemon && product.pokemon.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(product.pokemon);
    }
    if (product.set && product.set.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(product.set);
    }
  });

  seedPokemon.forEach(p => {
    if (p.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(p.name);
    }
  });

  seedSets.forEach(set => {
    if (set.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(set.name);
    }
  });

  const uniqueSuggestions = [...new Set(suggestions)];
  return uniqueSuggestions.slice(0, 10);
}
