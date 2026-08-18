'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchAll } from '@/lib/search';
import { ProductCard } from '@/components/products/ProductCard';
import { SearchResult } from '@/lib/search';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState<SearchResult>({
    products: [],
    pokemon: [],
    sets: [],
  });

  useEffect(() => {
    if (query) {
      setResults(searchAll(query));
      setSearchInput(query);
    } else {
      setResults({ products: [], pokemon: [], sets: [] });
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const totalCount = results.products.length + results.pokemon.length + results.sets.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search cards, Pokémon, sets..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>
      </form>

      {query ? (
        <>
          <p className="text-sm text-gray-500 mb-8">
            {totalCount} result{totalCount !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>

          {totalCount === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <SearchIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                No results found for &ldquo;{query}&rdquo;
              </h2>
              <p className="text-gray-500">Try a different search term.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {results.pokemon.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                      Pokémon
                    </h2>
                    <span className="text-xs text-gray-500">
                      {results.pokemon.length} result{results.pokemon.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-4">
                    {results.pokemon.map((p) => (
                      <Link
                        key={p.id}
                        href={`/pokemon/${p.slug}`}
                        className="flex flex-col items-center flex-shrink-0 group"
                      >
                        <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-purple-200 via-purple-100 to-fuchsia-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm group-hover:shadow-md">
                          <span className="text-3xl font-bold text-purple-700">
                            {p.name.charAt(0)}
                          </span>
                        </div>
                        <span className="mt-3 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors whitespace-nowrap">
                          {p.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.sets.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                      Sets
                    </h2>
                    <span className="text-xs text-gray-500">
                      {results.sets.length} result{results.sets.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.sets.map((set) => (
                      <Link
                        key={set.id}
                        href={`/sets/${set.slug}`}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-purple-600">
                            {set.name.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 truncate group-hover:text-purple-600">
                            {set.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {set.totalCards} cards{set.series ? ` · ${set.series}` : ''}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {results.products.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                      Products
                    </h2>
                    <span className="text-xs text-gray-500">
                      {results.products.length} result{results.products.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {results.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <SearchIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Enter a search term
          </h2>
          <p className="text-gray-500">
            Find Pokémon cards, graded cards, sealed products, and more.
          </p>
        </div>
      )}
    </div>
  );
}
