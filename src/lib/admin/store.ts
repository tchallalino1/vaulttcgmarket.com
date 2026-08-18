import { seedProducts } from '@/seed/products';
import { seedPokemon } from '@/seed/pokemon';
import { seedSets } from '@/seed/sets';
import { seedCategories } from '@/seed/categories';
import { Product, Pokemon, PokemonSet, Category, Seller } from '@/types';

let products: Product[] = [...seedProducts];
let pokemon: Pokemon[] = [...seedPokemon];
let sets: PokemonSet[] = [...seedSets];
let categories: Category[] = [...seedCategories];
let sellers: Seller[] = [
  { id: 'seller-001', name: 'Vault TCG Market', slug: 'vault-tcg-market', rating: 5.0, reviewCount: 0, verified: true },
];

export function getAllProducts(): Product[] { return products; }
export function getProductById(id: string): Product | undefined { return products.find(p => p.id === id); }
export function createProduct(product: Product): Product { products.unshift(product); return product; }
export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return undefined;
  products[idx] = { ...products[idx], ...updates, updatedAt: new Date().toISOString() };
  return products[idx];
}
export function deleteProduct(id: string): boolean {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}
export function getProductStats() {
  const total = products.length;
  const published = products.filter(p => p.stock > 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 3).length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const trending = products.filter(p => p.trending).length;
  const featured = products.filter(p => p.featured).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  return { total, published, lowStock, outOfStock, trending, featured, totalValue };
}

export function getAllPokemon(): Pokemon[] { return pokemon; }
export function getPokemonById(id: string): Pokemon | undefined { return pokemon.find(p => p.id === id); }
export function createPokemon(p: Pokemon): Pokemon { pokemon.push(p); return p; }
export function updatePokemon(id: string, updates: Partial<Pokemon>): Pokemon | undefined {
  const idx = pokemon.findIndex(p => p.id === id);
  if (idx === -1) return undefined;
  pokemon[idx] = { ...pokemon[idx], ...updates };
  return pokemon[idx];
}
export function deletePokemon(id: string): boolean {
  const idx = pokemon.findIndex(p => p.id === id);
  if (idx === -1) return false;
  pokemon.splice(idx, 1);
  return true;
}

export function getAllSets(): PokemonSet[] { return sets; }
export function getSetById(id: string): PokemonSet | undefined { return sets.find(s => s.id === id); }
export function createSet(s: PokemonSet): PokemonSet { sets.push(s); return s; }
export function updateSet(id: string, updates: Partial<PokemonSet>): PokemonSet | undefined {
  const idx = sets.findIndex(s => s.id === id);
  if (idx === -1) return undefined;
  sets[idx] = { ...sets[idx], ...updates };
  return sets[idx];
}
export function deleteSet(id: string): boolean {
  const idx = sets.findIndex(s => s.id === id);
  if (idx === -1) return false;
  sets.splice(idx, 1);
  return true;
}

export function getAllCategories(): Category[] { return categories; }
export function getCategoryById(id: string): Category | undefined { return categories.find(c => c.id === id); }
export function createCategory(c: Category): Category { categories.push(c); return c; }
export function updateCategory(id: string, updates: Partial<Category>): Category | undefined {
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) return undefined;
  categories[idx] = { ...categories[idx], ...updates };
  return categories[idx];
}
export function deleteCategory(id: string): boolean {
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) return false;
  categories.splice(idx, 1);
  return true;
}

export function getAllSellers(): Seller[] { return sellers; }
export function getSellerById(id: string): Seller | undefined { return sellers.find(s => s.id === id); }
