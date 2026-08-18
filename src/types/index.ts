export type ProductType = 'single' | 'graded' | 'sealed' | 'vintage' | 'accessory';
export type GradingCompany = 'PSA' | 'CGC' | 'BGS' | 'SGC' | 'ACE';
export type Condition = 'Near Mint' | 'Lightly Played' | 'Moderately Played' | 'Heavily Played' | 'Damaged' | 'Factory Sealed' | 'Unopened';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Rare Holo' | 'Ultra Rare' | 'Secret Rare' | 'Illustration Rare' | 'Special Illustration Rare' | 'Hyper Rare';
export type Language = 'English' | 'Japanese' | 'Korean' | 'Chinese' | 'German' | 'French' | 'Spanish' | 'Italian' | 'Portuguese';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  productType: ProductType;
  category: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  stock: number;
  images: string[];
  condition?: Condition;
  language?: Language;
  set?: string;
  setSlug?: string;
  cardNumber?: string;
  rarity?: Rarity;
  pokemon?: string;
  pokemonSlug?: string;
  gradingCompany?: GradingCompany;
  grade?: string;
  certificationNumber?: string;
  seller?: Seller;
  priceChange?: number;
  priceChangePercent?: number;
  pokemonTcgCardId?: string;
  featured?: boolean;
  trending?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pokemon {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  cardCount: number;
  pokemonTcgCardId?: string;
  popular?: boolean;
}

export interface PokemonSet {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  image?: string;
  releaseDate: string;
  totalCards: number;
  series?: string;
}

export interface Seller {
  id: string;
  name: string;
  slug: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MarketTrend {
  name: string;
  cardNumber: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  period: string;
  data: number[];
}

export interface SearchFilters {
  query?: string;
  pokemon?: string;
  set?: string;
  productType?: ProductType;
  condition?: Condition;
  gradingCompany?: GradingCompany;
  grade?: string;
  rarity?: Rarity;
  language?: Language;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'trending';
  page?: number;
  limit?: number;
}
