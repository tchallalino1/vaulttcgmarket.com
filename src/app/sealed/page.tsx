import { getSealedProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Sealed Pokémon Products — Vault TCG Market',
  description: 'Factory sealed Pokémon TCG products including booster boxes and ETBs.',
};

const categoryBadges = ['Booster Boxes', 'Elite Trainer Boxes', 'Booster Bundles', 'Collection Boxes'];

export default async function SealedPage() {
  const products = await getSealedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">SEALED POKÉMON PRODUCTS</h1>
        <p className="mt-2 text-gray-500">Factory sealed products including booster boxes, ETBs, and more.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categoryBadges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {badge}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-8">{products.length} sealed products available</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No sealed products available right now.</p>
        </div>
      )}
    </div>
  );
}
