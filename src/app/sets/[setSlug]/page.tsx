import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSetBySlug } from '@/lib/sets';
import { getProductsBySet } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export async function generateMetadata({ params }: { params: Promise<{ setSlug: string }> }) {
  const { setSlug } = await params;
  const set = getSetBySlug(setSlug);
  if (!set) return { title: 'Set Not Found' };
  return {
    title: `${set.name} — Vault TCG Market`,
    description: `Browse all cards from the ${set.name} set.`,
  };
}

export default async function SetDetailPage({ params }: { params: Promise<{ setSlug: string }> }) {
  const { setSlug } = await params;
  const set = getSetBySlug(setSlug);
  if (!set) notFound();

  const products = getProductsBySet(set.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/sets" className="hover:text-purple-600">Sets</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{set.name}</span>
      </nav>

      {/* Set Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-10 h-10 text-purple-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.243 1.007-2.25 2.25-2.25h13.5" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-1">{set.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            {set.series && <span>{set.series}</span>}
            {set.series && <span>·</span>}
            <span>{set.totalCards} cards</span>
            <span>·</span>
            <span>Released {new Date(set.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p className="text-gray-500">No products available for this set yet.</p>
          <Link href="/products" className="text-sm text-purple-600 hover:underline mt-2 inline-block">Browse all products →</Link>
        </div>
      )}
    </div>
  );
}
