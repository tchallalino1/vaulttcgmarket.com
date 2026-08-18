// Hybrid data layer - uses Prisma/Neon when available, falls back to seed data
import { seedProducts } from '@/seed/products';
import { seedPokemon } from '@/seed/pokemon';
import { seedSets } from '@/seed/sets';
import { seedCategories } from '@/seed/categories';
import { Product, Pokemon, PokemonSet, Category, Seller } from '@/types';

// Check if database is properly configured
function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL || '';
  return url.length > 0 && !url.includes('your-password') && !url.includes('ep-xxx');
}

// Lazy-load Prisma only when needed
let _prisma: any = null;
async function getPrisma() {
  if (!isDatabaseConfigured()) return null;
  if (!_prisma) {
    try {
      const { PrismaClient } = await import('@prisma/client');
      _prisma = new PrismaClient();
    } catch {
      return null;
    }
  }
  return _prisma;
}

// In-memory mutable copies for when DB is unavailable
let memProducts = [...seedProducts];
let memPokemon = [...seedPokemon];
let memSets = [...seedSets];
let memCategories = [...seedCategories];
let memSellers: Seller[] = [
  { id: 'seller-001', name: 'Vault TCG Market', slug: 'vault-tcg-market', rating: 5.0, reviewCount: 0, verified: true },
];

// ============ MAP FUNCTIONS ============
function mapProduct(p: any): Product {
  return {
    id: p.id, name: p.name, slug: p.slug, description: p.description || '',
    productType: p.productType, category: p.category || 'singles',
    price: p.price, compareAtPrice: p.compareAtPrice, currency: p.currency || 'USD',
    stock: p.stock, images: p.images || [], condition: p.condition, language: p.language,
    set: p.set, setSlug: p.setSlug, cardNumber: p.cardNumber, rarity: p.rarity,
    pokemon: p.pokemon, pokemonSlug: p.pokemonSlug,
    gradingCompany: p.gradingCompany, grade: p.grade, certificationNumber: p.certificationNumber,
    pokemonTcgCardId: p.pokemonTcgCardId, priceChange: p.priceChange,
    priceChangePercent: p.priceChangePercent, featured: p.featured || false,
    trending: p.trending || false,
    createdAt: p.createdAt?.toISOString?.() || p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt?.toISOString?.() || p.updatedAt || new Date().toISOString(),
  };
}
function mapPokemon(p: any): Pokemon {
  return { id: p.id, name: p.name, slug: p.slug, image: p.image || '', description: p.description, cardCount: p.cardCount || 0, pokemonTcgCardId: p.pokemonTcgCardId, popular: p.popular };
}
function mapSet(s: any): PokemonSet {
  return { id: s.id, name: s.name, slug: s.slug, logo: s.logo, image: s.image, releaseDate: s.releaseDate, totalCards: s.totalCards, series: s.series };
}
function mapCategory(c: any): Category {
  return { id: c.id, name: c.name, slug: c.slug, image: c.image || '', description: c.description || '', productCount: c.productCount || 0 };
}
function mapSeller(s: any): Seller {
  return { id: s.id, name: s.name, slug: s.slug, rating: s.rating || 0, reviewCount: s.reviewCount || 0, verified: s.verified || false, avatar: s.avatar };
}

// ============ PRODUCTS ============
export async function getAllProducts(): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) {
    try { return (await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })).map(mapProduct); } catch {}
  }
  return memProducts.map(mapProduct);
}
export async function getProductById(id: string): Promise<Product | undefined> {
  const prisma = await getPrisma();
  if (prisma) {
    try { const p = await prisma.product.findUnique({ where: { id } }); return p ? mapProduct(p) : undefined; } catch {}
  }
  return memProducts.find(p => p.id === id);
}
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const prisma = await getPrisma();
  if (prisma) {
    try { const p = await prisma.product.findUnique({ where: { slug } }); return p ? mapProduct(p) : undefined; } catch {}
  }
  return memProducts.find(p => p.slug === slug);
}
export async function createProduct(data: Partial<Product>): Promise<Product> {
  const prisma = await getPrisma();
  const product: Product = {
    id: data.id || `prod-${Date.now()}`, name: data.name || '', slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-') || '',
    description: data.description || '', productType: data.productType || 'single', category: data.category || 'singles',
    price: data.price || 0, compareAtPrice: data.compareAtPrice, currency: data.currency || 'USD', stock: data.stock || 0,
    images: data.images || [], condition: data.condition, language: data.language, set: data.set, setSlug: data.setSlug,
    cardNumber: data.cardNumber, rarity: data.rarity, pokemon: data.pokemon, pokemonSlug: data.pokemonSlug,
    gradingCompany: data.gradingCompany, grade: data.grade, certificationNumber: data.certificationNumber,
    pokemonTcgCardId: data.pokemonTcgCardId, priceChange: data.priceChange, priceChangePercent: data.priceChangePercent,
    featured: data.featured || false, trending: data.trending || false,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  };
  if (prisma) {
    try {
      const created = await prisma.product.create({ data: { ...product, images: product.images } });
      return mapProduct(created);
    } catch {}
  }
  memProducts.unshift(product);
  return product;
}
export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
  const prisma = await getPrisma();
  if (prisma) {
    try {
      const updated = await prisma.product.update({ where: { id }, data: { ...data, updatedAt: new Date() } });
      return mapProduct(updated);
    } catch {}
  }
  const idx = memProducts.findIndex(p => p.id === id);
  if (idx === -1) return undefined;
  memProducts[idx] = { ...memProducts[idx], ...data, updatedAt: new Date().toISOString() };
  return memProducts[idx];
}
export async function deleteProduct(id: string): Promise<boolean> {
  const prisma = await getPrisma();
  if (prisma) { try { await prisma.product.delete({ where: { id } }); return true; } catch {} }
  const idx = memProducts.findIndex(p => p.id === id);
  if (idx === -1) return false;
  memProducts.splice(idx, 1);
  return true;
}
export async function getProductStats() {
  const prisma = await getPrisma();
  if (prisma) {
    try {
      const [total, published, lowStock, outOfStock, trending, featured, val] = await Promise.all([
        prisma.product.count(), prisma.product.count({ where: { stock: { gt: 0 } } }),
        prisma.product.count({ where: { stock: { gt: 0, lte: 3 } } }), prisma.product.count({ where: { stock: 0 } }),
        prisma.product.count({ where: { trending: true } }), prisma.product.count({ where: { featured: true } }),
        prisma.product.aggregate({ _sum: { price: true }, where: { stock: { gt: 0 } } }),
      ]);
      return { total, published, lowStock, outOfStock, trending, featured, totalValue: val._sum.price || 0 };
    } catch {}
  }
  const total = memProducts.length;
  const published = memProducts.filter(p => p.stock > 0).length;
  const lowStock = memProducts.filter(p => p.stock > 0 && p.stock <= 3).length;
  const outOfStock = memProducts.filter(p => p.stock === 0).length;
  const trending = memProducts.filter(p => p.trending).length;
  const featured = memProducts.filter(p => p.featured).length;
  const totalValue = memProducts.reduce((sum, p) => sum + p.price * p.stock, 0);
  return { total, published, lowStock, outOfStock, trending, featured, totalValue };
}

// ============ POKEMON ============
export async function getAllPokemon(): Promise<Pokemon[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.pokemon.findMany({ orderBy: { name: 'asc' } })).map(mapPokemon); } catch {} }
  return memPokemon.map(mapPokemon);
}
export async function getPokemonById(id: string): Promise<Pokemon | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const p = await prisma.pokemon.findUnique({ where: { id } }); return p ? mapPokemon(p) : undefined; } catch {} }
  return memPokemon.find(p => p.id === id);
}
export async function getPokemonBySlug(slug: string): Promise<Pokemon | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const p = await prisma.pokemon.findUnique({ where: { slug } }); return p ? mapPokemon(p) : undefined; } catch {} }
  return memPokemon.find(p => p.slug === slug);
}
export async function getPopularPokemon(): Promise<Pokemon[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.pokemon.findMany({ where: { popular: true }, orderBy: { name: 'asc' } })).map(mapPokemon); } catch {} }
  return memPokemon.filter(p => p.popular).map(mapPokemon);
}
export async function createPokemon(data: Partial<Pokemon>): Promise<Pokemon> {
  const prisma = await getPrisma();
  const p: Pokemon = { id: data.id || `pokemon-${Date.now()}`, name: data.name || '', slug: data.slug || '', image: data.image || '', description: data.description, cardCount: data.cardCount || 0, pokemonTcgCardId: data.pokemonTcgCardId, popular: data.popular || false };
  if (prisma) { try { return mapPokemon(await prisma.pokemon.create({ data: p })); } catch {} }
  memPokemon.push(p); return p;
}
export async function updatePokemon(id: string, data: Partial<Pokemon>): Promise<Pokemon | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { return mapPokemon(await prisma.pokemon.update({ where: { id }, data })); } catch {} }
  const idx = memPokemon.findIndex(p => p.id === id);
  if (idx === -1) return undefined;
  memPokemon[idx] = { ...memPokemon[idx], ...data }; return memPokemon[idx];
}
export async function deletePokemon(id: string): Promise<boolean> {
  const prisma = await getPrisma();
  if (prisma) { try { await prisma.pokemon.delete({ where: { id } }); return true; } catch {} }
  const idx = memPokemon.findIndex(p => p.id === id);
  if (idx === -1) return false; memPokemon.splice(idx, 1); return true;
}

// ============ SETS ============
export async function getAllSets(): Promise<PokemonSet[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.set.findMany({ orderBy: { releaseDate: 'desc' } })).map(mapSet); } catch {} }
  return memSets.map(mapSet);
}
export async function getSetById(id: string): Promise<PokemonSet | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const s = await prisma.set.findUnique({ where: { id } }); return s ? mapSet(s) : undefined; } catch {} }
  return memSets.find(s => s.id === id);
}
export async function getSetBySlug(slug: string): Promise<PokemonSet | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const s = await prisma.set.findUnique({ where: { slug } }); return s ? mapSet(s) : undefined; } catch {} }
  return memSets.find(s => s.slug === slug);
}
export async function createSet(data: Partial<PokemonSet>): Promise<PokemonSet> {
  const prisma = await getPrisma();
  const s: PokemonSet = { id: data.id || `set-${Date.now()}`, name: data.name || '', slug: data.slug || '', logo: data.logo, image: data.image, releaseDate: data.releaseDate || '', totalCards: data.totalCards || 0, series: data.series };
  if (prisma) { try { return mapSet(await prisma.set.create({ data: s })); } catch {} }
  memSets.push(s); return s;
}
export async function updateSet(id: string, data: Partial<PokemonSet>): Promise<PokemonSet | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { return mapSet(await prisma.set.update({ where: { id }, data })); } catch {} }
  const idx = memSets.findIndex(s => s.id === id);
  if (idx === -1) return undefined; memSets[idx] = { ...memSets[idx], ...data }; return memSets[idx];
}
export async function deleteSet(id: string): Promise<boolean> {
  const prisma = await getPrisma();
  if (prisma) { try { await prisma.set.delete({ where: { id } }); return true; } catch {} }
  const idx = memSets.findIndex(s => s.id === id);
  if (idx === -1) return false; memSets.splice(idx, 1); return true;
}

// ============ CATEGORIES ============
export async function getAllCategories(): Promise<Category[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.category.findMany({ orderBy: { name: 'asc' } })).map(mapCategory); } catch {} }
  return memCategories.map(mapCategory);
}
export async function getCategoryById(id: string): Promise<Category | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const c = await prisma.category.findUnique({ where: { id } }); return c ? mapCategory(c) : undefined; } catch {} }
  return memCategories.find(c => c.id === id);
}
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const c = await prisma.category.findUnique({ where: { slug } }); return c ? mapCategory(c) : undefined; } catch {} }
  return memCategories.find(c => c.slug === slug);
}
export async function createCategory(data: Partial<Category>): Promise<Category> {
  const prisma = await getPrisma();
  const c: Category = { id: data.id || `cat-${Date.now()}`, name: data.name || '', slug: data.slug || '', image: data.image || '', description: data.description || '', productCount: data.productCount || 0 };
  if (prisma) { try { return mapCategory(await prisma.category.create({ data: c })); } catch {} }
  memCategories.push(c); return c;
}
export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { return mapCategory(await prisma.category.update({ where: { id }, data })); } catch {} }
  const idx = memCategories.findIndex(c => c.id === id);
  if (idx === -1) return undefined; memCategories[idx] = { ...memCategories[idx], ...data }; return memCategories[idx];
}
export async function deleteCategory(id: string): Promise<boolean> {
  const prisma = await getPrisma();
  if (prisma) { try { await prisma.category.delete({ where: { id } }); return true; } catch {} }
  const idx = memCategories.findIndex(c => c.id === id);
  if (idx === -1) return false; memCategories.splice(idx, 1); return true;
}

// ============ SELLERS ============
export async function getAllSellers(): Promise<Seller[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.seller.findMany()).map(mapSeller); } catch {} }
  return memSellers;
}
export async function getSellerById(id: string): Promise<Seller | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const s = await prisma.seller.findUnique({ where: { id } }); return s ? mapSeller(s) : undefined; } catch {} }
  return memSellers.find(s => s.id === id);
}

// ============ SEARCH & QUERIES ============
export async function searchProducts(query: string): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) {
    try {
      const q = query.toLowerCase();
      return (await prisma.product.findMany({
        where: { OR: [
          { name: { contains: q, mode: 'insensitive' } }, { pokemon: { contains: q, mode: 'insensitive' } },
          { set: { contains: q, mode: 'insensitive' } }, { cardNumber: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ]}, orderBy: { createdAt: 'desc' },
      })).map(mapProduct);
    } catch {}
  }
  const q = query.toLowerCase();
  return memProducts.filter(p =>
    p.name.toLowerCase().includes(q) || p.pokemon?.toLowerCase().includes(q) ||
    p.set?.toLowerCase().includes(q) || p.cardNumber?.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  ).map(mapProduct);
}
export async function getProductsByType(type: string): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.product.findMany({ where: { productType: type }, orderBy: { createdAt: 'desc' } })).map(mapProduct); } catch {} }
  return memProducts.filter(p => p.productType === type).map(mapProduct);
}
export async function getProductsByPokemon(pokemonName: string): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.product.findMany({ where: { pokemon: pokemonName }, orderBy: { createdAt: 'desc' } })).map(mapProduct); } catch {} }
  return memProducts.filter(p => p.pokemon === pokemonName).map(mapProduct);
}
export async function getProductsBySet(setSlug: string): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.product.findMany({ where: { setSlug }, orderBy: { createdAt: 'desc' } })).map(mapProduct); } catch {} }
  return memProducts.filter(p => p.setSlug === setSlug).map(mapProduct);
}
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const typeMap: Record<string, string> = { singles: 'single', graded: 'graded', sealed: 'sealed', vintage: 'vintage', accessories: 'accessory' };
  const t = typeMap[categorySlug]; if (!t) return [];
  return getProductsByType(t);
}
export async function getTrendingProducts(): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) { try { return (await prisma.product.findMany({ where: { trending: true }, orderBy: { createdAt: 'desc' } })).map(mapProduct); } catch {} }
  return memProducts.filter(p => p.trending).map(mapProduct);
}
export async function getFeaturedProduct(): Promise<Product | undefined> {
  const prisma = await getPrisma();
  if (prisma) { try { const p = await prisma.product.findFirst({ where: { featured: true } }); return p ? mapProduct(p) : undefined; } catch {} }
  return memProducts.find(p => p.featured);
}
export async function getDeals(): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) {
    try {
      return (await prisma.product.findMany({ where: { compareAtPrice: { not: null } }, orderBy: { createdAt: 'desc' } }))
        .filter((p: any) => p.compareAtPrice && p.compareAtPrice > p.price).map(mapProduct);
    } catch {}
  }
  return memProducts.filter(p => p.compareAtPrice && p.compareAtPrice > p.price).map(mapProduct);
}
export async function getGradedProducts(): Promise<Product[]> { return getProductsByType('graded'); }
export async function getSealedProducts(): Promise<Product[]> { return getProductsByType('sealed'); }
export async function getVintageProducts(): Promise<Product[]> { return getProductsByType('vintage'); }
export async function getAccessoryProducts(): Promise<Product[]> { return getProductsByType('accessory'); }
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const prisma = await getPrisma();
  if (prisma) {
    try {
      return (await prisma.product.findMany({
        where: { id: { not: product.id }, OR: [
          { pokemon: product.pokemon || undefined }, { setSlug: product.setSlug || undefined }, { productType: product.productType },
        ]}, take: limit, orderBy: { createdAt: 'desc' },
      })).map(mapProduct);
    } catch {}
  }
  return memProducts.filter(p => p.id !== product.id && (p.pokemon === product.pokemon || p.setSlug === product.setSlug || p.productType === product.productType)).slice(0, limit).map(mapProduct);
}
export async function getAllProductsRaw() { return getAllProducts(); }
