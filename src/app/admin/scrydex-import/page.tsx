'use client';
import { useState } from 'react';
import Link from 'next/link';

interface ScrydexProduct {
  id: string;
  name: string;
  type: string;
  imageUrl: string | null;
  expansion: string;
  language: string;
}

export default function ScrydexImportPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ScrydexProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [importing, setImporting] = useState<string | null>(null);
  const [imported, setImported] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/scrydex/sealed?q=${encodeURIComponent(query)}&pageSize=20`);
      const data = await res.json();
      setResults(data.products || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const handleImport = async (product: ScrydexProduct) => {
    setImporting(product.id);
    try {
      const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const price = 0;
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          slug,
          description: `${product.name} from ${product.expansion}. Factory sealed.`,
          productType: 'sealed',
          category: 'sealed',
          price,
          currency: 'USD',
          stock: 10,
          images: product.imageUrl ? [product.imageUrl] : [],
          condition: 'Factory Sealed',
          language: product.language || 'English',
          set: product.expansion,
          imageSource: 'scrydex',
          externalProductId: product.id,
          externalImageUrl: product.imageUrl || '',
          externalSource: 'scrydex',
        }),
      });
      setImported(prev => [...prev, product.id]);
    } catch (error) {
      console.error('Import failed:', error);
    }
    setImporting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Import Sealed Products</h2>
        <Link href="/admin/products" className="text-sm text-purple-600 hover:text-purple-700">← Back to Products</Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
        <h3 className="font-semibold text-lg mb-2">Search Scrydex Catalog</h3>
        <p className="text-sm text-gray-500 mb-4">Search for real sealed Pokémon products from the Scrydex database.</p>

        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder='Search sealed products... e.g. "Booster Box", "Twilight Masquerade", "151"'
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-gray-400">Try:</span>
          {['Booster Box', 'Booster Pack', 'Twilight Masquerade', 'Prismatic Evolutions', '151'].map(suggestion => (
            <button key={suggestion} onClick={() => { setQuery(suggestion); }} className="text-xs text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-1 rounded">{suggestion}</button>
          ))}
        </div>
      </div>

      {searched && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Results ({results.length})</h3>
            <div className="flex gap-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">All</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Booster Packs</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Booster Boxes</span>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-8">Searching...</p>
          ) : results.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No products found.</p>
          ) : (
            <div className="space-y-4">
              {results.map(product => (
                <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-20 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.type} · {product.expansion}</p>
                    <p className="text-xs text-gray-400">{product.language}</p>
                  </div>
                  <button
                    onClick={() => handleImport(product)}
                    disabled={importing === product.id || imported.includes(product.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      imported.includes(product.id)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    } disabled:opacity-50`}
                  >
                    {imported.includes(product.id) ? 'Imported ✓' : importing === product.id ? 'Importing...' : 'Import'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
