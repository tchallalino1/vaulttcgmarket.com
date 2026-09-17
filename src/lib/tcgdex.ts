// TCGdex API Client and Image URL Helpers
// API docs: https://tcgdex.dev/rest
// Image format: https://assets.tcgdex.net/en/{series}/{setId}/{cardNumber}

const BASE_URL = 'https://api.tcgdex.net/v2/en';

// Map of set ID prefixes to their series directory on the TCGdex CDN
const SET_SERIES_MAP: Record<string, string> = {
  base1: 'base', base2: 'base', base3: 'base', base4: 'base', base5: 'base',
  basep: 'base', bp: 'base',
  gym1: 'gym', gym2: 'gym',
  neo1: 'neo', neo2: 'neo', neo3: 'neo', neo4: 'neo', si1: 'neo',
  lc: 'ecard',
  ecard1: 'ecard', ecard2: 'ecard', ecard3: 'ecard',
  ex1: 'ex', ex2: 'ex', ex3: 'ex', ex4: 'ex', ex5: 'ex', ex6: 'ex', ex7: 'ex', ex8: 'ex', ex9: 'ex',
  ex10: 'ex', ex11: 'ex', ex12: 'ex', ex13: 'ex', ex14: 'ex', ex15: 'ex', ex16: 'ex',
  dp1: 'dp', dp2: 'dp', dp3: 'dp', dp4: 'dp', dp5: 'dp', dp6: 'dp', dp7: 'dp',
  pop1: 'pop', pop2: 'pop', pop3: 'pop', pop4: 'pop', pop5: 'pop', pop6: 'pop', pop7: 'pop', pop8: 'pop', pop9: 'pop',
  pl1: 'pl', pl2: 'pl', pl3: 'pl', pl4: 'pl',
  hgss1: 'hgss', hgss2: 'hgss', hgss3: 'hgss', hgss4: 'hgss',
  col1: 'col',
  bw1: 'bw', bw2: 'bw', bw3: 'bw', bw4: 'bw', bw5: 'bw', bw6: 'bw', bw7: 'bw', bw8: 'bw', bw9: 'bw', bw10: 'bw', bw11: 'bw',
  bw12: 'bw', bw13: 'bw', bw14: 'bw', bw15: 'bw', bw16: 'bw',
  xy1: 'xy', xy2: 'xy', xy3: 'xy', xy4: 'xy', xy5: 'xy', xy6: 'xy', xy7: 'xy', xy8: 'xy', xy9: 'xy', xy10: 'xy', xy11: 'xy', xy12: 'xy',
  g1: 'xy',
  xyp: 'xy',
  xy0: 'xy',
  bwp: 'bw',
  dv1: 'bw',
  sm1: 'sm', sm2: 'sm', sm3: 'sm', sm35: 'sm', sm4: 'sm', sm5: 'sm', sm6: 'sm', sm7: 'sm', sm75: 'sm',
  sm8: 'sm', sm9: 'sm', sm10: 'sm', sm11: 'sm', sm12: 'sm',
  sm115: 'sm', sma: 'sm', smp: 'sm',
  swsh1: 'swsh', swsh2: 'swsh', swsh3: 'swsh', swsh35: 'swsh', swsh4: 'swsh', swsh45: 'swsh',
  swsh5: 'swsh', swsh6: 'swsh', swsh7: 'swsh', swsh8: 'swsh', swsh9: 'swsh', swsh10: 'swsh',
  swsh11: 'swsh', swsh12: 'swsh', 'swsh12.5': 'swsh',
  cel25: 'swsh', swshp: 'swsh',
  sv01: 'sv', sv02: 'sv', sv03: 'sv', sv035: 'sv', sv04: 'sv', sv045: 'sv',
  sv05: 'sv', sv06: 'sv', sv065: 'sv', sv07: 'sv', sv08: 'sv', sv085: 'sv',
  sv09: 'sv', sv10: 'sv',
  me01: 'me', me02: 'me', me025: 'me', me03: 'me', me04: 'me', me05: 'me',
  'sv03.5': 'sv', 'sv04.5': 'sv', 'sv06.5': 'sv', 'sv08.5': 'sv', 'sv10.5b': 'sv', 'sv10.5w': 'sv',
  swsh45sv: 'swsh',
};

function getSeries(setId: string): string {
  // Try exact match first
  if (SET_SERIES_MAP[setId]) return SET_SERIES_MAP[setId];
  // Try without dots for dotted IDs like swsh12.5
  const cleanId = setId.replace(/\./g, '');
  if (SET_SERIES_MAP[cleanId]) return SET_SERIES_MAP[cleanId];
  // Try prefix matching for IDs like swsh45sv
  for (const [key, series] of Object.entries(SET_SERIES_MAP)) {
    if (setId.startsWith(key)) return series;
  }
  // Fallback: use first part before any numbers
  const match = setId.match(/^([a-z]+)/);
  return match ? match[1] : 'swsh';
}

// Generate TCGdex image URL from card ID
// Card ID format: "setId-cardNumber" e.g., "base1-4", "swsh7-215", "sv03.5-228"
export function getTcgdexImageUrl(cardId: string): string {
  const parts = cardId.split('-');
  const setId = parts[0];
  const number = parts.slice(1).join('-');
  const series = getSeries(setId);
  return `https://assets.tcgdex.net/en/${series}/${setId}/${number}.png`;
}

// Get set logo URL
export function getTcgdexSetLogoUrl(setId: string): string {
  const series = getSeries(setId);
  return `https://assets.tcgdex.net/en/${series}/${setId}/logo`;
}

// Get set symbol URL
export function getTcgdexSetSymbolUrl(setId: string): string {
  const series = getSeries(setId);
  return `https://assets.tcgdex.net/univ/${series}/${setId}/symbol`;
}

// Fetch a card from TCGdex API
export async function fetchTcgdexCard(cardId: string): Promise<any | null> {
  try {
    const res = await fetch(`${BASE_URL}/cards/${cardId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Search cards on TCGdex API
export async function searchTcgdexCards(query: string, limit = 20): Promise<any[]> {
  try {
    const res = await fetch(`${BASE_URL}/cards?q=name:${encodeURIComponent(query)}&limit=${limit}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Get the best image URL for a product
export function getProductImageUrl(product: { pokemonTcgCardId?: string; images?: string[] }): string | null {
  // Priority: 1. Product images, 2. TCGdex card
  if (product.images && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  if (product.pokemonTcgCardId) {
    return getTcgdexImageUrl(product.pokemonTcgCardId);
  }
  return null;
}
