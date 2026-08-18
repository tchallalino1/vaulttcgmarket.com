import { getCardById, searchCards } from './client';
import type { PokemonTcgCard } from './types';

export const PRODUCT_CARD_MAP: Record<string, string> = {
  'charizard-vmax': 'swsh9-215',
  'umbreon-vmax': 'swsh8-215',
  'pikachu-vmax-37': 'swsh4-44',
  'gengar-vmax': 'swsh11-157',
  'mewtwo-vstar': 'swsh12-50',
  'rayquaza-vmax-alt-art': 'swsh8-218',
  'eevee-vmax': 'swsh8-189',
  'dragonite-vstar': 'swsh10-71',
  'charizard-ex-228': 'sv3pt5-228',
  'pikachu-illustration-rare': 'sv3pt5-174',
  'umbreon-v': 'swsh8-94',
  'mewtwo-special-illustration-rare': 'sv3pt5-203',
  'psa-10-charizard-vmax': 'swsh9-215',
  'psa-10-umbreon-vmax': 'swsh8-215',
  'psa-9-pikachu-vmax': 'swsh4-44',
  'psa-10-mewtwo-vstar': 'swsh12-50',
  'psa-10-rayquaza-vmax-alt-art': 'swsh8-218',
  'psa-8-charizard-base-set': 'base1-4',
  'cgc-95-umbreon-vmax': 'swsh8-215',
  'cgc-10-charizard-ex': 'sv3pt5-228',
  'cgc-9-rayquaza-vmax': 'swsh8-218',
  'bgs-95-charizard-vmax': 'swsh9-215',
  'evolving-skies-booster-box': 'swsh8',
  'pokemon-151-booster-bundle': 'sv3pt5',
  'crown-zenith-etb': 'swsh12',
  'lost-origin-booster-box': 'swsh11',
  'silver-tempest-booster-box': 'swsh10',
  '1st-edition-holo-charizard': 'base1-4',
  'base-set-pikachu': 'base1-58',
  'neo-genesis-lugia': 'neo2-27',
  'fossil-mewtwo': 'fossil-10',
};

export const POKEMON_REPRESENTATIVE_CARDS: Record<string, string> = {
  Charizard: 'base1-4',
  Pikachu: 'swsh4-44',
  Umbreon: 'swsh8-215',
  Gengar: 'swsh11-157',
  Mewtwo: 'base1-10',
  Rayquaza: 'swsh8-218',
  Eevee: 'swsh8-189',
  Dragonite: 'swsh10-71',
};

export const CATEGORY_REPRESENTATIVE_CARDS: Record<string, string> = {
  singles: 'swsh8-215',
  graded: 'base1-4',
  sealed: 'swsh8',
  vintage: 'base1-4',
  accessories: 'swsh8-215',
};

let cardCache: Record<string, PokemonTcgCard> = {};

export async function getCardForProduct(
  productSlug: string
): Promise<PokemonTcgCard | null> {
  const cardId = PRODUCT_CARD_MAP[productSlug];
  if (!cardId) return null;

  if (cardCache[cardId]) return cardCache[cardId];

  try {
    const card = await getCardById(cardId);
    if (card) {
      cardCache[cardId] = card;
    }
    return card;
  } catch {
    return null;
  }
}

export async function getCardForPokemon(
  pokemonName: string
): Promise<PokemonTcgCard | null> {
  const cardId = POKEMON_REPRESENTATIVE_CARDS[pokemonName];
  if (!cardId) return null;

  if (cardCache[cardId]) return cardCache[cardId];

  try {
    const card = await getCardById(cardId);
    if (card) {
      cardCache[cardId] = card;
    }
    return card;
  } catch {
    return null;
  }
}

export async function getCardsForManyProducts(
  slugs: string[]
): Promise<Record<string, PokemonTcgCard>> {
  const results: Record<string, PokemonTcgCard> = {};

  const promises = slugs.map(async (slug) => {
    const card = await getCardForProduct(slug);
    if (card) {
      results[slug] = card;
    }
  });

  await Promise.allSettled(promises);
  return results;
}

export async function getCardsForManyPokemon(
  names: string[]
): Promise<Record<string, PokemonTcgCard>> {
  const results: Record<string, PokemonTcgCard> = {};

  const promises = names.map(async (name) => {
    const card = await getCardForPokemon(name);
    if (card) {
      results[name] = card;
    }
  });

  await Promise.allSettled(promises);
  return results;
}

export async function searchPokemonCards(
  query: string
): Promise<PokemonTcgCard[]> {
  try {
    const result = await searchCards(query, 10);
    return result.data || [];
  } catch {
    return [];
  }
}
