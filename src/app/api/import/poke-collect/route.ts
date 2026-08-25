import { NextResponse } from 'next/server';
import { pokeCollectProducts } from '@/seed/poke-collect-products';
import { createProduct } from '@/lib/admin/db';
import { Product } from '@/types';

export async function POST() {
  try {
    const products = pokeCollectProducts;
    const results: Product[] = [];

    for (const product of products) {
      const created = await createProduct({
        ...product,
        id: `pc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      results.push(created);
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${results.length} products from poke-collect.com`,
      products: results,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ error: 'Failed to import products' }, { status: 500 });
  }
}
