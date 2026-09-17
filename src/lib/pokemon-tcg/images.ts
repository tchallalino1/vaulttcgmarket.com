// Image URL helpers for Vault TCG Market
// Primary source: TCGdex API (https://tcgdex.dev)
// Fallback: Pokemon TCG API (https://pokemontcg.io)

import { getTcgdexImageUrl as _getTcgdexImageUrl } from '@/lib/tcgdex';

// Re-export TCGdex function
export const getTcgdexImageUrl = _getTcgdexImageUrl;

// Pokemon TCG API image URLs (fallback)
export function getCardImageUrl(cardId: string, size: 'small' | 'large' = 'large'): string {
  const parts = cardId.split('-');
  const setId = parts[0];
  const number = parts.slice(1).join('-');
  if (size === 'small') {
    return `https://images.pokemontcg.io/${setId}/${number}.png`;
  }
  return `https://images.pokemontcg.io/${setId}/${number}_hires.png`;
}

// Get the best available image for a product
export function getProductImageUrl(product: { pokemonTcgCardId?: string; images?: string[] }): string | null {
  if (product.images && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  if (product.pokemonTcgCardId) {
    return getTcgdexImageUrl(product.pokemonTcgCardId);
  }
  return null;
}

export function getSetSymbolUrl(setId: string): string {
  return getTcgdexImageUrl(setId).replace(/\/[^/]+$/, '/symbol');
}

export function getSetLogoUrl(setId: string): string {
  return getTcgdexImageUrl(setId).replace(/\/[^/]+$/, '/logo');
}

export const CARD_BACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiByeD0iMTIiIGZpbGw9IiMxQTBhMmUiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTQwIiByPSI2MCIgc3Ryb2tlPSIjN2MzYWVkIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz4KPHRleHQgeD0iMTAwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3YzNhZWQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5WTVQ8L3RleHQ+Cjwvc3ZnPg==';
