import { getGradedProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Graded Pokémon Cards — Vault TCG Market',
  description: 'Professionally graded Pokémon cards from PSA, CGC, BGS and more.',
};

const gradeFilters = ['All', 'PSA', 'CGC', 'BGS'];

export default function GradedPage() {
  const products = getGradedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">GRADED POKÉMON CARDS</h1>
        <p className="mt-2 text-gray-500">Professionally graded collectibles from PSA, CGC, BGS and more.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {gradeFilters.map((filter) => (
          <span
            key={filter}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === 'All'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-8">{products.length} graded cards available</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No graded cards available right now.</p>
        </div>
      )}
    </div>
  );
}
