import Link from 'next/link';
import { getDeals } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Deals — Vault TCG Market',
  description: 'Great deals and discounted Pokémon cards and products.',
};

export default function DealsPage() {
  const deals = getDeals();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">DEALS</h1>
        <p className="mt-2 text-gray-500">Save on discounted Pokémon cards and products.</p>
      </div>

      {deals.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-8">{deals.length} deals available</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-900 text-lg font-semibold mb-2">No deals available right now</p>
          <p className="text-gray-500 mb-6">Check back soon for new discounts and promotions.</p>
          <Link
            href="/pokemon"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            EXPLORE ALL PRODUCTS
          </Link>
        </div>
      )}
    </div>
  );
}
