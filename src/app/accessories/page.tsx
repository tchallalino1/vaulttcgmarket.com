'use client';
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/types';

const filters = [
  { label: 'All', value: '' },
  { label: 'Card Sleeves', value: 'sleeves' },
  { label: 'Top Loaders', value: 'toploader' },
  { label: 'Binders', value: 'binder' },
  { label: 'Display Cases', value: 'display' },
  { label: 'Storage', value: 'storage' },
];

export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then((data: Product[]) => {
        setProducts(data.filter(p => p.productType === 'accessory'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeFilter
    ? products.filter(p => p.name.toLowerCase().includes(activeFilter) || p.description?.toLowerCase().includes(activeFilter))
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">ACCESSORIES</h1>
        <p className="mt-2 text-gray-500">Protection, storage, and display for your collection.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === cat.value
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-8">{filtered.length} accessories available</p>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No accessories found for this filter.</p>
          <button onClick={() => setActiveFilter('')} className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium">Clear filter</button>
        </div>
      )}
    </div>
  );
}
