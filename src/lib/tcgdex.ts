const BASE_URL = 'https://api.tcgdex.net/v2/en';

export interface TcgdexCard {
  id: string;
  name: string;
  image: string;
  set: { id: string; name: string };
  localId: string;
  rarity?: string;
  illustrator?: string;
  hp?: string;
  types?: string[];
  category: string;
}

export interface TcgdexSet {
  id: string;
  name: string;
  logo?: string;
  symbol?: string;
  cardCount: { total: number; official: number };
}

// Get card image URL from TCGdex card ID
export function getTcgdexImageUrl(cardId: string, size: 'small' | 'large' = 'large'): string {
  // TCGdex image format: https://assets.tcgdex.net/en/{setId}/{cardNumber}.png
  const parts = cardId.split('-');
  const setId = parts[0];
  const number = parts.slice(1).join('-');
  return `https://assets.tcgdex.net/en/${setId}/${number}.png`;
}

// Fetch a card from TCGdex
export async function fetchTcgdexCard(cardId: string): Promise<TcgdexCard | null> {
  try {
    const res = await fetch(`${BASE_URL}/cards/${cardId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Search cards on TCGdex
export async function searchTcgdexCards(query: string, limit = 10): Promise<TcgdexCard[]> {
  try {
    const res = await fetch(`${BASE_URL}/cards?q=name:${encodeURIComponent(query)}&limit=${limit}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Get cards by set from TCGdex
export async function getTcgdexCardsBySet(setId: string, limit = 50): Promise<TcgdexCard[]> {
  try {
    const res = await fetch(`${BASE_URL}/cards?q=set.id:${setId}&limit=${limit}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Fetch all sets from TCGdex
export async function fetchTcgdexSets(): Promise<TcgdexSet[]> {
  try {
    const res = await fetch(`${BASE_URL}/sets`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Get set image URL
export function getTcgdexSetLogoUrl(setId: string): string {
  return `https://assets.tcgdex.net/en/${setId}/logo`;
}

// API route handler for searching cards
export async function handleTcgdexSearch(query: string) {
  return searchTcgdexCards(query, 20);
}
