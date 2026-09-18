// Scrydex API Client for Sealed Products
// Docs: https://scrydex.com/docs/pokemon/sealed

const BASE_URL = 'https://api.scrydex.com/pokemon/v1';

export interface ScrydexSealedProduct {
  id: string;
  name: string;
  type: string; // "Booster Pack", "Booster Box", "Elite Trainer Box", etc.
  description?: string;
  images: { type: string; small: string; medium: string; large: string }[];
  expansion: {
    id: string;
    name: string;
    series: string;
    total: number;
    printed_total: number;
    language: string;
    language_code: string;
    release_date: string;
    is_online_only: boolean;
  };
  expansion_sort_order: number;
  variants: { name: string; prices: any[] }[];
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const apiKey = process.env.SCRYDEX_API_KEY;
  const teamId = process.env.SCRYDEX_TEAM_ID;
  if (apiKey) headers['X-Api-Key'] = apiKey;
  if (teamId) headers['X-Team-ID'] = teamId;
  return headers;
}

export async function searchScrydexSealed(query: string, pageSize = 20): Promise<ScrydexSealedProduct[]> {
  try {
    const url = `${BASE_URL}/sealed?q=${encodeURIComponent(query)}&pageSize=${pageSize}`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) {
      console.error('Scrydex API error:', res.status);
      return [];
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Scrydex fetch error:', error);
    return [];
  }
}

export async function getScrydexSealedById(id: string): Promise<ScrydexSealedProduct | null> {
  try {
    const res = await fetch(`${BASE_URL}/sealed/${id}`, { headers: getHeaders() });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Scrydex fetch error:', error);
    return null;
  }
}

export function getScrydexImageUrl(images: ScrydexSealedProduct['images'], size: 'small' | 'medium' | 'large' = 'large'): string | null {
  if (!images || images.length === 0) return null;
  const frontImage = images.find(img => img.type === 'front') || images[0];
  return frontImage[size] || frontImage.large || null;
}
