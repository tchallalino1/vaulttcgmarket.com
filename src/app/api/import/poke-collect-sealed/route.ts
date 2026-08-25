import { pokeCollectSealedProducts } from '@/seed/poke-collect-sealed-products';
import { createProduct } from '@/lib/admin/db';
import { Product } from '@/types';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const products = pokeCollectSealedProducts;
    const results: Product[] = [];

    for (const product of products) {
      const created = await createProduct({
        ...product,
        id: `pcs-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      results.push(created);
    }

    return res.status(200).json({
      success: true,
      message: `Imported ${results.length} sealed products from poke-collect.com`,
      products: results,
    });
  } catch (error) {
    console.error('Import error:', error);
    return res.status(500).json({ error: 'Failed to import products' });
  }
}
