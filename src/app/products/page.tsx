import { getAllProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'All Products — Vault TCG Market',
  description: 'Browse our complete collection of Pokémon cards, graded cards, sealed products, and more.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">ALL PRODUCTS</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
