import { getSupabase } from '@/lib/supabase';
import { Product, Pokemon, PokemonSet, Category, Seller, Review } from '@/types';
import { seedProducts } from '@/seed/products';
import { seedPokemon } from '@/seed/pokemon';
import { seedSets } from '@/seed/sets';
import { seedCategories } from '@/seed/categories';

function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && url !== 'your_supabase_url' && key !== 'your_supabase_anon_key' && url.length > 10);
}

function sb() {
  if (!isConfigured()) return null;
  try { return getSupabase(); } catch { return null; }
}

// In-memory fallback for when Supabase is not configured
let memProducts = [...seedProducts];
let memPokemon = [...seedPokemon];
let memSets = [...seedSets];
let memCategories = [...seedCategories];
let memSellers: Seller[] = [{ id: 'seller-001', name: 'Vault TCG Market', slug: 'vault-tcg-market', rating: 5.0, reviewCount: 0, verified: true }];
let memReviews: Review[] = [
  { id: 'rev-001', productId: 'prod-002', productName: 'Umbreon VMAX', customerName: 'Alex M.', customerEmail: 'alex@example.com', rating: 5, title: 'Perfect condition!', comment: 'Card arrived in perfect condition.', verified: true, helpful: 12, status: 'approved', createdAt: '2024-03-15T10:30:00Z', updatedAt: '2024-03-15T10:30:00Z' },
  { id: 'rev-002', productId: 'prod-002', productName: 'Umbreon VMAX', customerName: 'Sarah K.', customerEmail: 'sarah@example.com', rating: 5, title: 'Stunning card', comment: 'Even more beautiful in person.', verified: true, helpful: 8, status: 'approved', createdAt: '2024-03-10T14:20:00Z', updatedAt: '2024-03-10T14:20:00Z' },
  { id: 'rev-003', productId: 'prod-001', productName: 'Charizard VMAX', customerName: 'Mike R.', customerEmail: 'mike@example.com', rating: 4, title: 'Great card', comment: 'Card is great overall.', verified: true, helpful: 5, status: 'approved', createdAt: '2024-03-08T09:15:00Z', updatedAt: '2024-03-08T09:15:00Z' },
];

// ============ PRODUCTS ============

export async function getAllProducts(): Promise<Product[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').order('created_at', { ascending: false });
    return (data || []).map(mapProduct);
  }
  return memProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const client = sb(); if (!client) return undefined;
  const { data } = await client.from('products').select('*').eq('id', id).single();
  return data ? mapProduct(data) : undefined;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').eq('slug', slug).single();
    return data ? mapProduct(data) : undefined;
  }
  return memProducts.find(p => p.slug === slug);
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const client = sb();
  const id = data.id || `prod-${Date.now()}`;
  const slug = data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || '';
  const record = {
    id, name: data.name || '', slug, description: data.description || '',
    product_type: data.productType || 'single', category: data.category || 'singles',
    price: data.price || 0, compare_at_price: data.compareAtPrice,
    currency: data.currency || 'USD', stock: data.stock || 0,
    images: data.images || [], condition: data.condition, language: data.language,
    set_name: data.set, set_slug: data.setSlug, card_number: data.cardNumber,
    rarity: data.rarity, pokemon: data.pokemon, pokemon_slug: data.pokemonSlug,
    grading_company: data.gradingCompany, grade: data.grade,
    certification_number: data.certificationNumber, pokemon_tcg_card_id: data.pokemonTcgCardId,
    price_change: data.priceChange, price_change_percent: data.priceChangePercent,
    featured: data.featured || false, trending: data.trending || false,
  };
  if (client) {
    const { data: created } = await client.from('products').insert(record).select().single();
    return mapProduct(created);
  }
  return mapProduct(record);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
  const client = sb();
  const updates: Record<string, unknown> = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.slug !== undefined) updates.slug = data.slug;
  if (data.description !== undefined) updates.description = data.description;
  if (data.productType !== undefined) updates.product_type = data.productType;
  if (data.category !== undefined) updates.category = data.category;
  if (data.price !== undefined) updates.price = data.price;
  if (data.compareAtPrice !== undefined) updates.compare_at_price = data.compareAtPrice;
  if (data.stock !== undefined) updates.stock = data.stock;
  if (data.images !== undefined) updates.images = data.images;
  if (data.condition !== undefined) updates.condition = data.condition;
  if (data.language !== undefined) updates.language = data.language;
  if (data.set !== undefined) updates.set_name = data.set;
  if (data.setSlug !== undefined) updates.set_slug = data.setSlug;
  if (data.cardNumber !== undefined) updates.card_number = data.cardNumber;
  if (data.rarity !== undefined) updates.rarity = data.rarity;
  if (data.pokemon !== undefined) updates.pokemon = data.pokemon;
  if (data.pokemonSlug !== undefined) updates.pokemon_slug = data.pokemonSlug;
  if (data.gradingCompany !== undefined) updates.grading_company = data.gradingCompany;
  if (data.grade !== undefined) updates.grade = data.grade;
  if (data.certificationNumber !== undefined) updates.certification_number = data.certificationNumber;
  if (data.pokemonTcgCardId !== undefined) updates.pokemon_tcg_card_id = data.pokemonTcgCardId;
  if (data.priceChange !== undefined) updates.price_change = data.priceChange;
  if (data.priceChangePercent !== undefined) updates.price_change_percent = data.priceChangePercent;
  if (data.featured !== undefined) updates.featured = data.featured;
  if (data.trending !== undefined) updates.trending = data.trending;
  updates.updated_at = new Date().toISOString();
  if (client) {
    const { data: updated } = await client.from('products').update(updates).eq('id', id).select().single();
    return updated ? mapProduct(updated) : undefined;
  }
  return undefined;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const client = sb();
  if (!client) return false;
  const { error } = await client.from('products').delete().eq('id', id);
  return !error;
}

export async function getProductStats() {
  const client = sb();
  if (!client) return { total: 0, published: 0, lowStock: 0, outOfStock: 0, trending: 0, featured: 0, totalValue: 0 };
  const { data } = await client.from('products').select('*');
  const all = data || [];
  return {
    total: all.length,
    published: all.filter((p: any) => p.stock > 0).length,
    lowStock: all.filter((p: any) => p.stock > 0 && p.stock <= 3).length,
    outOfStock: all.filter((p: any) => p.stock === 0).length,
    trending: all.filter((p: any) => p.trending).length,
    featured: all.filter((p: any) => p.featured).length,
    totalValue: all.reduce((s: number, p: any) => s + (p.price || 0) * (p.stock || 0), 0),
  };
}

// ============ POKEMON ============

export async function getAllPokemon(): Promise<Pokemon[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('pokemon').select('*').order('name');
    return (data || []).map(mapPokemon);
  }
  return memPokemon;
}

export async function getPokemonById(id: string): Promise<Pokemon | undefined> {
  const client = sb(); if (!client) return undefined;
  const { data } = await client.from('pokemon').select('*').eq('id', id).single();
  return data ? mapPokemon(data) : undefined;
}

export async function getPokemonBySlug(slug: string): Promise<Pokemon | undefined> {
  const client = sb();
  if (client) {
    const { data } = await client.from('pokemon').select('*').eq('slug', slug).single();
    return data ? mapPokemon(data) : undefined;
  }
  return memPokemon.find(p => p.slug === slug);
}

export async function getPopularPokemon(): Promise<Pokemon[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('pokemon').select('*').eq('popular', true).order('name');
    return (data || []).map(mapPokemon);
  }
  return memPokemon.filter(p => p.popular);
}

export async function createPokemon(data: Partial<Pokemon>): Promise<Pokemon> {
  const client = sb();
  const record = { id: data.id || `pokemon-${Date.now()}`, name: data.name || '', slug: data.slug || '', image: data.image || '', description: data.description, card_count: data.cardCount || 0, pokemon_tcg_card_id: data.pokemonTcgCardId, popular: data.popular || false };
  if (client) { const { data: c } = await client.from('pokemon').insert(record).select().single(); return mapPokemon(c); }
  return mapPokemon(record);
}

export async function updatePokemon(id: string, data: Partial<Pokemon>): Promise<Pokemon | undefined> {
  const client = sb();
  const updates: Record<string, unknown> = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.slug !== undefined) updates.slug = data.slug;
  if (data.image !== undefined) updates.image = data.image;
  if (data.description !== undefined) updates.description = data.description;
  if (data.cardCount !== undefined) updates.card_count = data.cardCount;
  if (data.pokemonTcgCardId !== undefined) updates.pokemon_tcg_card_id = data.pokemonTcgCardId;
  if (data.popular !== undefined) updates.popular = data.popular;
  if (client) { const { data: u } = await client.from('pokemon').update(updates).eq('id', id).select().single(); return u ? mapPokemon(u) : undefined; }
  return undefined;
}

export async function deletePokemon(id: string): Promise<boolean> {
  const client = sb(); if (!client) return false;
  const { error } = await client.from('pokemon').delete().eq('id', id);
  return !error;
}

// ============ SETS ============

export async function getAllSets(): Promise<PokemonSet[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('sets').select('*').order('release_date', { ascending: false });
    return (data || []).map(mapSet);
  }
  return memSets;
}

export async function getSetById(id: string): Promise<PokemonSet | undefined> {
  const client = sb();
  if (client) {
    const { data } = await client.from('sets').select('*').eq('id', id).single();
    return data ? mapSet(data) : undefined;
  }
  return memSets.find(s => s.id === id);
}

export async function getSetBySlug(slug: string): Promise<PokemonSet | undefined> {
  const client = sb();
  if (client) {
    const { data } = await client.from('sets').select('*').eq('slug', slug).single();
    return data ? mapSet(data) : undefined;
  }
  return memSets.find(s => s.slug === slug);
}

export async function createSet(data: Partial<PokemonSet>): Promise<PokemonSet> {
  const client = sb();
  const record = { id: data.id || `set-${Date.now()}`, name: data.name || '', slug: data.slug || '', logo: data.logo, image_url: data.image, release_date: data.releaseDate || '', total_cards: data.totalCards || 0, series: data.series };
  if (client) { const { data: c } = await client.from('sets').insert(record).select().single(); return mapSet(c); }
  return mapSet(record);
}

export async function updateSet(id: string, data: Partial<PokemonSet>): Promise<PokemonSet | undefined> {
  const client = sb();
  const updates: Record<string, unknown> = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.slug !== undefined) updates.slug = data.slug;
  if (data.logo !== undefined) updates.logo = data.logo;
  if (data.image !== undefined) updates.image_url = data.image;
  if (data.releaseDate !== undefined) updates.release_date = data.releaseDate;
  if (data.totalCards !== undefined) updates.total_cards = data.totalCards;
  if (data.series !== undefined) updates.series = data.series;
  if (client) { const { data: u } = await client.from('sets').update(updates).eq('id', id).select().single(); return u ? mapSet(u) : undefined; }
  return undefined;
}

export async function deleteSet(id: string): Promise<boolean> {
  const client = sb(); if (!client) return false;
  const { error } = await client.from('sets').delete().eq('id', id);
  return !error;
}

// ============ CATEGORIES ============

export async function getAllCategories(): Promise<Category[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('categories').select('*').order('name');
    return (data || []).map(mapCategory);
  }
  return memCategories;
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const client = sb();
  if (client) {
    const { data } = await client.from('categories').select('*').eq('id', id).single();
    return data ? mapCategory(data) : undefined;
  }
  return memCategories.find(c => c.id === id);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const client = sb();
  if (client) {
    const { data } = await client.from('categories').select('*').eq('slug', slug).single();
    return data ? mapCategory(data) : undefined;
  }
  return memCategories.find(c => c.slug === slug);
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  const client = sb();
  const record = { id: data.id || `cat-${Date.now()}`, name: data.name || '', slug: data.slug || '', image: data.image || '', description: data.description || '', product_count: data.productCount || 0 };
  if (client) { const { data: c } = await client.from('categories').insert(record).select().single(); return mapCategory(c); }
  return mapCategory(record);
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | undefined> {
  const client = sb();
  const updates: Record<string, unknown> = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.slug !== undefined) updates.slug = data.slug;
  if (data.image !== undefined) updates.image = data.image;
  if (data.description !== undefined) updates.description = data.description;
  if (data.productCount !== undefined) updates.product_count = data.productCount;
  if (client) { const { data: u } = await client.from('categories').update(updates).eq('id', id).select().single(); return u ? mapCategory(u) : undefined; }
  return undefined;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const client = sb(); if (!client) return false;
  const { error } = await client.from('categories').delete().eq('id', id);
  return !error;
}

// ============ SELLERS ============

export async function getAllSellers(): Promise<Seller[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('sellers').select('*').order('name');
    return (data || []).map(mapSeller);
  }
  return memSellers;
}

export async function getSellerById(id: string): Promise<Seller | undefined> {
  const client = sb(); if (!client) return undefined;
  const { data } = await client.from('sellers').select('*').eq('id', id).single();
  return data ? mapSeller(data) : undefined;
}

// ============ REVIEWS ============

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('reviews').select('*').eq('product_id', productId).eq('status', 'approved').order('created_at', { ascending: false });
    return (data || []).map(mapReview);
  }
  return memReviews.filter(r => r.productId === productId);
}

export async function getAllReviews(): Promise<Review[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('reviews').select('*').order('created_at', { ascending: false });
    return (data || []).map(mapReview);
  }
  return memReviews;
}

export async function getReviewStats(productId: string) {
  const reviews = await getReviewsByProduct(productId);
  const total = reviews.length;
  const average = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
  const distribution = [0, 0, 0, 0, 0];
  reviews.forEach(r => { distribution[r.rating - 1]++; });
  return { total, average: Math.round(average * 10) / 10, distribution };
}

export async function createReview(data: Partial<Review>): Promise<Review> {
  const client = sb();
  const record = {
    id: `rev-${Date.now()}`, product_id: data.productId || '', product_name: data.productName || '',
    customer_name: data.customerName || 'Anonymous', customer_email: data.customerEmail || '',
    rating: data.rating || 5, title: data.title, comment: data.comment || '',
    verified: data.verified || false, helpful: 0, status: 'approved',
  };
  if (client) { const { data: c } = await client.from('reviews').insert(record).select().single(); return mapReview(c); }
  return mapReview(record);
}

export async function deleteReview(id: string): Promise<boolean> {
  const client = sb(); if (!client) return false;
  const { error } = await client.from('reviews').delete().eq('id', id);
  return !error;
}

// ============ SEARCH ============

export async function searchProducts(query: string): Promise<Product[]> {
  const client = sb();
  if (client) {
    const q = query.toLowerCase();
    const { data } = await client.from('products').select('*').or(`name.ilike.%${q}%,pokemon.ilike.%${q}%,set_name.ilike.%${q}%,card_number.ilike.%${q}%,description.ilike.%${q}%`).order('created_at', { ascending: false });
    return (data || []).map(mapProduct);
  }
  const q = query.toLowerCase();
  return memProducts.filter(p =>
    p.name.toLowerCase().includes(q) || p.pokemon?.toLowerCase().includes(q) ||
    p.set?.toLowerCase().includes(q) || p.cardNumber?.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

export async function getProductsByType(type: string): Promise<Product[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').eq('product_type', type).order('created_at', { ascending: false });
    return (data || []).map(mapProduct);
  }
  return memProducts.filter(p => p.productType === type);
}

export async function getProductsByPokemon(pokemonName: string): Promise<Product[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').eq('pokemon', pokemonName).order('created_at', { ascending: false });
    return (data || []).map(mapProduct);
  }
  return memProducts.filter(p => p.pokemon === pokemonName);
}

export async function getProductsBySet(setSlug: string): Promise<Product[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').eq('set_slug', setSlug).order('created_at', { ascending: false });
    return (data || []).map(mapProduct);
  }
  return memProducts.filter(p => p.setSlug === setSlug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const typeMap: Record<string, string> = { singles: 'single', graded: 'graded', sealed: 'sealed', vintage: 'vintage', accessories: 'accessory' };
  const t = typeMap[categorySlug]; if (!t) return [];
  return getProductsByType(t);
}

export async function getTrendingProducts(): Promise<Product[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').eq('trending', true).order('created_at', { ascending: false });
    return (data || []).map(mapProduct);
  }
  return memProducts.filter(p => p.trending);
}

export async function getFeaturedProduct(): Promise<Product | undefined> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').eq('featured', true).limit(1).single();
    return data ? mapProduct(data) : undefined;
  }
  return memProducts.find(p => p.featured);
}

export async function getDeals(): Promise<Product[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').not('compare_at_price', 'is', null).order('created_at', { ascending: false });
    return (data || []).filter((p: any) => p.compare_at_price && p.compare_at_price > p.price).map(mapProduct);
  }
  return memProducts.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
}

export async function getGradedProducts(): Promise<Product[]> { return getProductsByType('graded'); }
export async function getSealedProducts(): Promise<Product[]> { return getProductsByType('sealed'); }
export async function getVintageProducts(): Promise<Product[]> { return getProductsByType('vintage'); }
export async function getAccessoryProducts(): Promise<Product[]> { return getProductsByType('accessory'); }

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const client = sb();
  if (client) {
    const { data } = await client.from('products').select('*').neq('id', product.id).or(`pokemon.eq.${product.pokemon || ''},set_slug.eq.${product.setSlug || ''},product_type.eq.${product.productType}`).limit(limit).order('created_at', { ascending: false });
    return (data || []).map(mapProduct);
  }
  return memProducts.filter(p => p.id !== product.id && (p.pokemon === product.pokemon || p.setSlug === product.setSlug || p.productType === product.productType)).slice(0, limit);
}

export async function getAllProductsRaw() { return getAllProducts(); }

// ============ MAP FUNCTIONS ============

function mapProduct(p: any): Product {
  return {
    id: p.id, name: p.name, slug: p.slug, description: p.description || '',
    productType: p.product_type, category: p.category,
    price: Number(p.price), compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
    currency: p.currency, stock: p.stock, images: p.images || [],
    condition: p.condition, language: p.language, set: p.set_name, setSlug: p.set_slug,
    cardNumber: p.card_number, rarity: p.rarity, pokemon: p.pokemon, pokemonSlug: p.pokemon_slug,
    gradingCompany: p.grading_company, grade: p.grade, certificationNumber: p.certification_number,
    pokemonTcgCardId: p.pokemon_tcg_card_id, priceChange: p.price_change ? Number(p.price_change) : undefined,
    priceChangePercent: p.price_change_percent ? Number(p.price_change_percent) : undefined,
    featured: p.featured, trending: p.trending,
    createdAt: p.created_at, updatedAt: p.updated_at,
  };
}

function mapPokemon(p: any): Pokemon {
  return { id: p.id, name: p.name, slug: p.slug, image: p.image || '', description: p.description, cardCount: p.card_count || 0, pokemonTcgCardId: p.pokemon_tcg_card_id, popular: p.popular };
}

function mapSet(s: any): PokemonSet {
  return { id: s.id, name: s.name, slug: s.slug, logo: s.logo, image: s.image_url, releaseDate: s.release_date, totalCards: s.total_cards, series: s.series };
}

function mapCategory(c: any): Category {
  return { id: c.id, name: c.name, slug: c.slug, image: c.image || '', description: c.description || '', productCount: c.product_count || 0 };
}

function mapSeller(s: any): Seller {
  return { id: s.id, name: s.name, slug: s.slug, rating: Number(s.rating) || 0, reviewCount: s.review_count || 0, verified: s.verified, avatar: s.avatar };
}

function mapReview(r: any): Review {
  return {
    id: r.id, productId: r.product_id, productName: r.product_name,
    customerName: r.customer_name, customerEmail: r.customer_email,
    rating: r.rating, title: r.title, comment: r.comment,
    verified: r.verified || false, helpful: r.helpful || 0, status: r.status,
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}
