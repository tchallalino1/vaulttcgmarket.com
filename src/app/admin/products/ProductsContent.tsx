'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Product, ProductType } from '@/types';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'stock_asc' | 'stock_desc';

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ProductType | ''>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [sort, setSort] = useState<SortOption>('newest');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.pokemon && p.pokemon.toLowerCase().includes(q)) ||
          (p.set && p.set.toLowerCase().includes(q))
      );
    }

    if (typeFilter) {
      result = result.filter((p) => p.productType === typeFilter);
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'published') {
        result = result.filter((p) => p.stock > 0);
      } else if (statusFilter === 'draft') {
        result = result.filter((p) => p.stock === 0 && p.images.length > 0);
      } else if (statusFilter === 'archived') {
        result = result.filter((p) => p.stock === 0 && p.images.length === 0);
      }
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'stock_asc':
        result.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock_desc':
        result.sort((a, b) => b.stock - a.stock);
        break;
    }

    return result;
  }, [products, search, typeFilter, statusFilter, sort]);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  function getStatus(p: Product) {
    if (p.stock > 0) return { label: 'Published', color: 'bg-green-100 text-green-700' };
    if (p.images.length > 0) return { label: 'Draft', color: 'bg-amber-100 text-amber-700' };
    return { label: 'Archived', color: 'bg-gray-100 text-gray-500' };
  }

  function getTypeBadge(type: ProductType) {
    const colors: Record<ProductType, string> = {
      single: 'bg-purple-100 text-purple-700',
      graded: 'bg-blue-100 text-blue-700',
      sealed: 'bg-amber-100 text-amber-700',
      vintage: 'bg-rose-100 text-rose-700',
      accessory: 'bg-teal-100 text-teal-700',
    };
    const labels: Record<ProductType, string> = {
      single: 'Single',
      graded: 'Graded',
      sealed: 'Sealed',
      vintage: 'Vintage',
      accessory: 'Accessory',
    };
    return { label: labels[type], color: colors[type] };
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, Pokémon, or set..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ProductType | '')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Types</option>
            <option value="single">Single Card</option>
            <option value="graded">Graded Card</option>
            <option value="sealed">Sealed Product</option>
            <option value="vintage">Vintage</option>
            <option value="accessory">Accessory</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="stock_asc">Stock: Low to High</option>
            <option value="stock_desc">Stock: High to Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500 font-medium">No products found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or add a new product.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product) => {
                  const status = getStatus(product);
                  const typeBadge = getTypeBadge(product.productType);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {product.images[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{product.name}</p>
                            {product.set && <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.set}</p>}
                            <span className={`inline-flex mt-1 items-center px-1.5 py-0.5 rounded text-[10px] font-medium md:hidden ${typeBadge.color}`}>
                              {typeBadge.label}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeBadge.color}`}>
                          {typeBadge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <p className="text-xs text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell">
                        <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : product.stock <= 3 ? 'text-amber-600' : 'text-gray-900'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center hidden lg:table-cell">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === product.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
