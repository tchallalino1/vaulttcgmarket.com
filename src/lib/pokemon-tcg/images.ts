export function getCardImageUrl(cardId: string, size: 'small' | 'large' = 'large'): string {
  const parts = cardId.split('-');
  const setId = parts[0];
  const number = parts.slice(1).join('-');

  if (size === 'small') {
    return `https://images.pokemontcg.io/${setId}/${number}.png`;
  }
  return `https://images.pokemontcg.io/${setId}/${number}_hires.png`;
}

export function getSetSymbolUrl(setId: string): string {
  return `https://images.pokemontcg.io/${setId}/symbol.png`;
}

export function getSetLogoUrl(setId: string): string {
  return `https://images.pokemontcg.io/${setId}/logo.png`;
}

export const CARD_BACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiByeD0iMTIiIGZpbGw9IiMxQTBhMmUiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTQwIiByPSI2MCIgc3Ryb2tlPSIjN2MzYWVkIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz4KPHRleHQgeD0iMTAwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM3YzNhZWQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5WTVQ8L3RleHQ+Cjwvc3ZnPg==';
