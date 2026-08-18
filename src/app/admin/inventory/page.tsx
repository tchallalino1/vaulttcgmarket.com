'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';

type FilterTab = 'all' | 'low' | 'out';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [stockEdits, setStockEdits] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    const sorted = [...data].sort((a: Product, b: Product) => a.stock - b.stock);
    setProducts(sorted);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filtered = products.filter((p) => {
    if (filter === 'low') return p.stock > 0 && p.stock <= 3;
    if (filter === 'out') return p.stock === 0;
    return true;
  });

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-700 border-red-200';
    if (stock <= 3) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const handleStockChange = (id: string, value: string) => {
    const num = parseInt(value, 10);
    setStockEdits((prev) => ({ ...prev, [id]: isNaN(num) ? 0 : num }));
  };

  const saveStock = async (id: string) => {
    setSavingId(id);
    const newStock = stockEdits[id] ?? 0;
    await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock }),
    });
    setSavingId(null);
    fetchProducts();
  };

  const tabs = [
    { key: 'all' as FilterTab, label: 'All Products', count: products.length },
    { key: 'low' as FilterTab, label: 'Low Stock', count: products.filter((p) => p.stock > 0 && p.stock <= 3).length },
    { key: 'out' as FilterTab, label: 'Out of Stock', count: products.filter((p) => p.stock === 0).length },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
              filter === tab.key ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No products match this filter</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.set}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                        {p.productType}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm font-medium text-gray-900">${p.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStockColor(p.stock)}`}>
                        {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          value={stockEdits[p.id] ?? p.stock}
                          onChange={(e) => handleStockChange(p.id, e.target.value)}
                          className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                        <button
                          onClick={() => saveStock(p.id)}
                          disabled={savingId === p.id || (stockEdits[p.id] ?? p.stock) === p.stock}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {savingId === p.id ? '...' : 'Save'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
