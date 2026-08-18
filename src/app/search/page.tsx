import { Suspense } from 'react';
import SearchContent from './SearchContent';

export const metadata = {
  title: 'Search — Vault TCG Market',
  description: 'Search for Pokémon cards, graded cards, sealed products, and more.',
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
