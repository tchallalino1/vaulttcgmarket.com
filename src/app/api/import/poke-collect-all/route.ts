import { NextResponse } from 'next/server';
import { pokeCollectImportProducts } from '@/seed/poke-collect-import';
import { createProduct } from '@/lib/admin/db';
import { Product } from '@/types';

export async function POST() {
  try {
    const products = pokeCollectImportProducts;
    const results: Product[] = [];
    const errors: string[] = [];

    for (const product of products) {
      try {
        const created = await createProduct({
          ...product,
          id: `pci-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        results.push(created);
      } catch (error) {
        errors.push(`Failed to import ${product.name}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${results.length} products from poke-collect.com`,
      breakdown: {
        sealed: results.filter(p => p.productType === 'sealed').length,
        accessories: results.filter(p => p.productType === 'accessory').length,
      },
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ error: 'Failed to import products' }, { status: 500 });
  }
}
