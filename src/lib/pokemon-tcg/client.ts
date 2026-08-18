import type {
  PokemonTcgApiResponse,
  PokemonTcgCard,
  PokemonTcgSet,
  PokemonTcgSetApiResponse,
} from './types';

const BASE_URL = 'https://api.pokemontcg.io/v2';

const cache = new Map<string, { data: unknown; expiry: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, expiry: Date.now() + CACHE_TTL });
}

async function fetchApi<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }

  const cacheKey = url.toString();
  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  const headers: Record<string, string> = {};
  if (process.env.POKEMON_TCG_API_KEY) {
    headers['X-Api-Key'] = process.env.POKEMON_TCG_API_KEY;
  }

  const response = await fetch(url.toString(), {
    headers,
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Pokemon TCG API error: ${response.status}`);
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

export async function searchCards(
  query: string,
  pageSize = 10
): Promise<PokemonTcgApiResponse> {
  return fetchApi<PokemonTcgApiResponse>('/cards', {
    q: query,
    pageSize: String(pageSize),
  });
}

export async function getCardById(
  id: string
): Promise<PokemonTcgCard | null> {
  try {
    const result = await fetchApi<{ data: PokemonTcgCard }>(`/cards/${id}`);
    return result.data;
  } catch {
    return null;
  }
}

export async function getCardsByName(
  name: string,
  pageSize = 10
): Promise<PokemonTcgApiResponse> {
  return searchCards(`name:"${name}"`, pageSize);
}

export async function getCardsBySet(
  setId: string,
  pageSize = 250
): Promise<PokemonTcgApiResponse> {
  return searchCards(`set.id:${setId}`, pageSize);
}

export async function getCardsByPokemon(
  pokemonName: string,
  pageSize = 10
): Promise<PokemonTcgApiResponse> {
  return searchCards(`name:"${pokemonName}"`, pageSize);
}

export async function getSets(
  pageSize = 50
): Promise<PokemonTcgSetApiResponse> {
  return fetchApi<PokemonTcgSetApiResponse>('/sets', {
    pageSize: String(pageSize),
  });
}

export async function getSetById(
  id: string
): Promise<PokemonTcgSet | null> {
  try {
    const result = await fetchApi<{ data: PokemonTcgSet }>(`/sets/${id}`);
    return result.data;
  } catch {
    return null;
  }
}
