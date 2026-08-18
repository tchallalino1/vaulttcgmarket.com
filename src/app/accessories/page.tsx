import { getAccessoryProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Pokémon Accessories — Vault TCG Market',
  description: 'Card sleeves, binders, top loaders, display cases and more.',
};

const accessoryCategories = ['Card Sleeves', 'Top Loaders', 'Binders', 'Display Cases', 'Storage'];

export default async function AccessoriesPage() {
  const products = await getAccessoryProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">ACCESSORIES</h1>
        <p className="mt-2 text-gray-500">Protection, storage, and display for your collection.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {accessoryCategories.map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {category}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-8">{products.length} accessories available</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No accessories available right now.</p>
        </div>
      )}
    </div>
  );
}
