import { getVintageProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Vintage Pokémon Cards — Vault TCG Market',
  description: 'Classic vintage Pokémon cards from the original sets.',
};

const vintageEras = ['Base Set', 'Jungle', 'Fossil', 'Team Rocket', 'Neo Genesis', 'Gym Heroes'];

export default async function VintagePage() {
  const products = await getVintageProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">VINTAGE POKÉMON</h1>
        <p className="mt-2 text-gray-500">Classic cards from the original Pokémon TCG sets.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {vintageEras.map((era) => (
          <span
            key={era}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
          >
            {era}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-8">{products.length} vintage cards available</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No vintage cards available right now.</p>
        </div>
      )}
    </div>
  );
}
