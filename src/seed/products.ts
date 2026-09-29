import { Product, ProductType } from '@/types';

export const seedProducts: Product[] = [];

export function getTrendingProducts(): Product[] {
  return seedProducts.filter(product => product.trending === true);
}

export function getFeaturedProduct(): Product | undefined {
  return seedProducts.find(product => product.featured === true);
}

export function getProductBySlug(slug: string): Product | undefined {
  return seedProducts.find(product => product.slug === slug);
}

export function getProductsByType(type: ProductType): Product[] {
  return seedProducts.filter(product => product.productType === type);
}

export function getProductsByPokemon(pokemonName: string): Product[] {
  return seedProducts.filter(product => product.pokemon === pokemonName);
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.toLowerCase().trim();
  return seedProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      (product.pokemon && product.pokemon.toLowerCase().includes(normalizedQuery)) ||
      (product.set && product.set.toLowerCase().includes(normalizedQuery)) ||
      (product.cardNumber && product.cardNumber.toLowerCase().includes(normalizedQuery)) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function getProductsBySet(setSlug: string): Product[] {
  return seedProducts.filter(p => p.setSlug === setSlug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'singles') return seedProducts.filter(p => p.productType === 'single');
  if (categorySlug === 'graded') return seedProducts.filter(p => p.productType === 'graded');
  if (categorySlug === 'sealed') return seedProducts.filter(p => p.productType === 'sealed');
  if (categorySlug === 'vintage') return seedProducts.filter(p => p.productType === 'vintage');
  if (categorySlug === 'accessories') return seedProducts.filter(p => p.productType === 'accessory');
  return [];
}

export function getDeals(): Product[] {
  return seedProducts.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
}

export function getGradedProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'graded');
}

export function getSealedProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'sealed');
}

export function getVintageProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'vintage');
}

export function getAccessoryProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'accessory');
}

export function getProductsByRarity(rarity: string): Product[] {
  return seedProducts.filter(p => p.rarity === rarity);
}

export function getProductsByGrade(gradingCompany: string, grade?: string): Product[] {
  return seedProducts.filter(p => {
    if (p.gradingCompany !== gradingCompany) return false;
    if (grade && p.grade !== grade) return false;
    return true;
  });
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return seedProducts
    .filter(p => p.id !== product.id && (
      p.pokemon === product.pokemon ||
      p.set === product.set ||
      p.productType === product.productType
    ))
    .slice(0, limit);
}

export function getAllProducts(): Product[] {
  return seedProducts;
}

export function getFilteredProducts(filters: {
  pokemon?: string;
  set?: string;
  productType?: string;
  condition?: string;
  gradingCompany?: string;
  grade?: string;
  rarity?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
}): Product[] {
  let results = [...seedProducts];

  if (filters.pokemon) {
    results = results.filter(p => p.pokemon?.toLowerCase() === filters.pokemon!.toLowerCase());
  }
  if (filters.set) {
    results = results.filter(p => p.setSlug === filters.set);
  }
  if (filters.productType) {
    results = results.filter(p => p.productType === filters.productType);
  }
  if (filters.condition) {
    results = results.filter(p => p.condition === filters.condition);
  }
  if (filters.gradingCompany) {
    results = results.filter(p => p.gradingCompany === filters.gradingCompany);
  }
  if (filters.grade) {
    results = results.filter(p => p.grade === filters.grade);
  }
  if (filters.rarity) {
    results = results.filter(p => p.rarity === filters.rarity);
  }
  if (filters.language) {
    results = results.filter(p => p.language === filters.language);
  }
  if (filters.minPrice != null) {
    results = results.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    results = results.filter(p => p.price <= filters.maxPrice!);
  }
  if (filters.inStock) {
    results = results.filter(p => p.stock > 0);
  }

  switch (filters.sort) {
    case 'price_asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'popular':
      results.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
      break;
    case 'trending':
      results.sort((a, b) => (b.priceChangePercent || 0) - (a.priceChangePercent || 0));
      break;
    default:
      break;
  }

  return results;
}
