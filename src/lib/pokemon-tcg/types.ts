export interface PokemonTcgCard {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  attacks?: {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }[];
  weaknesses?: { type: string; value: string }[];
  resistances?: { type: string; value: string }[];
  retreatCost?: string[];
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    releaseDate: string;
    images: { symbol: string; logo: string };
  };
  number: string;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  images: {
    small: string;
    large: string;
  };
  tcgplayer?: {
    url: string;
    updatedAt: string;
    prices: Record<
      string,
      {
        low?: number;
        mid?: number;
        high?: number;
        market?: number;
        directLow?: number | null;
      }
    >;
  };
  cardmarket?: {
    url: string;
    updatedAt: string;
    prices: Record<string, number>;
  };
}

export interface PokemonTcgApiResponse {
  data: PokemonTcgCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface PokemonTcgSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Record<string, string>;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: { symbol: string; logo: string };
}

export interface PokemonTcgSetApiResponse {
  data: PokemonTcgSet[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}
