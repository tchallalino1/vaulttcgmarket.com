import Link from 'next/link';
import { getAllProducts, getTrendingProducts } from '@/lib/products';
import { getSets } from '@/lib/sets';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Pokémon Market — Vault TCG Market',
  description: 'Real-time Pokémon TCG market data, price trends, and analytics.',
};

export default function MarketPage() {
  const products = getAllProducts();
  const trending = getTrendingProducts();
  const sets = getSets();

  const totalProducts = products.length;
  const trendingCount = trending.length;
  const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
  const priceMovers = [...products]
    .filter((p) => p.priceChangePercent != null)
    .sort((a, b) => (b.priceChangePercent ?? 0) - (a.priceChangePercent ?? 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">POKÉMON MARKET</h1>
        <p className="text-gray-500">Real-time market data and analytics for the Pokémon TCG.</p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Trending Cards</p>
          <p className="text-2xl font-bold text-purple-600">{trendingCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Average Price</p>
          <p className="text-2xl font-bold text-gray-900">${averagePrice.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price Movers</p>
          <p className="text-2xl font-bold text-green-600">{priceMovers.length}</p>
        </div>
      </div>

      {/* Trending Cards */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trending Cards</h2>
          <Link href="/products?sort=trending" className="text-sm text-purple-600 hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Price Movers */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Price Movers</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-100">
            {priceMovers.slice(0, 8).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{product.name}</span>
                  <span className="text-xs text-gray-500">{product.set}{product.cardNumber ? ` ${product.cardNumber}` : ''}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-sm">${product.price.toFixed(2)}</span>
                  <span
                    className={`text-sm font-medium px-2 py-0.5 rounded ${
                      (product.priceChangePercent ?? 0) >= 0
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {(product.priceChangePercent ?? 0) >= 0 ? '+' : ''}{product.priceChangePercent?.toFixed(1)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sets */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Popular Sets</h2>
          <Link href="/sets" className="text-sm text-purple-600 hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sets.slice(0, 8).map((set) => (
            <Link
              key={set.id}
              href={`/sets/${set.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-purple-200 transition-all"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg mb-3 flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.243 1.007-2.25 2.25-2.25h13.5" />
                </svg>
              </div>
              <h3 className="font-medium text-sm group-hover:text-purple-600 transition-colors">{set.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{set.series}</p>
              <p className="text-xs text-gray-400 mt-0.5">{set.totalCards} cards</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Market Insights */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
        <div className="bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0a0a1a] rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Rising Demand</h3>
              <p className="text-sm text-gray-300">Modern alt-art cards continue to see strong appreciation across all grading tiers.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Sealed Products</h3>
              <p className="text-sm text-gray-300">Evolving Skies and Pokémon 151 sealed products remain the top investment picks.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Graded Cards</h3>
              <p className="text-sm text-gray-300">PSA 10 modern cards hold value well. CGC gaining market share rapidly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
