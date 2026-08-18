import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/admin/store';
import { Product } from '@/types';

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const product: Product = {
    id: `prod-${Date.now()}`,
    name: body.name || '',
    slug: body.slug || body.name?.toLowerCase().replace(/\s+/g, '-') || '',
    description: body.description || '',
    productType: body.productType || 'single',
    category: body.category || 'singles',
    price: Number(body.price) || 0,
    compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
    currency: body.currency || 'USD',
    stock: Number(body.stock) || 0,
    images: body.images || [],
    condition: body.condition,
    language: body.language,
    set: body.set,
    setSlug: body.setSlug,
    cardNumber: body.cardNumber,
    rarity: body.rarity,
    pokemon: body.pokemon,
    pokemonSlug: body.pokemonSlug,
    gradingCompany: body.gradingCompany,
    grade: body.grade,
    certificationNumber: body.certificationNumber,
    pokemonTcgCardId: body.pokemonTcgCardId,
    featured: body.featured || false,
    trending: body.trending || false,
    priceChange: body.priceChange,
    priceChangePercent: body.priceChangePercent,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const created = await createProduct(product);
  return NextResponse.json(created, { status: 201 });
}
