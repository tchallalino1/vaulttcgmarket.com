import Link from 'next/link';
import { getSets } from '@/lib/sets';

export const metadata = {
  title: 'Pokémon TCG Sets — Vault TCG Market',
  description: 'Browse all Pokémon TCG sets available on Vault TCG Market.',
};

export default function SetsPage() {
  const sets = getSets();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">POKÉMON TCG SETS</h1>
        <p className="text-gray-500">Browse all Pokémon TCG sets available on Vault TCG Market.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {sets.map((set) => (
          <Link
            key={set.id}
            href={`/sets/${set.slug}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all"
          >
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4">
              <svg className="w-12 h-12 text-purple-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.243 1.007-2.25 2.25-2.25h13.5" />
              </svg>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm group-hover:text-purple-600 transition-colors">{set.name}</h3>
              {set.series && (
                <p className="text-xs text-gray-500 mt-1">{set.series}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">{set.totalCards} cards</span>
                <span className="text-xs text-gray-400">{new Date(set.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
