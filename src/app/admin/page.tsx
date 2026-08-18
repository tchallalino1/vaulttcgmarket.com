import { Metadata } from 'next';
import Link from 'next/link';
import { getProductStats, getAllProducts, getAllPokemon, getAllSets, getAllCategories, getAllSellers } from '@/lib/admin/store';

export const metadata: Metadata = {
  title: 'Dashboard — Vault TCG Admin',
};

export default function AdminDashboard() {
  const stats = getProductStats();
  const products = getAllProducts();
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 3).slice(0, 5);
  const recentProducts = [...products].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  const statCards = [
    { label: 'Total Products', value: stats.total, href: '/admin/products', color: 'bg-purple-500', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: 'Published', value: stats.published, href: '/admin/products', color: 'bg-green-500', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Low Stock', value: stats.lowStock, href: '/admin/products', color: 'bg-amber-500', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { label: 'Out of Stock', value: stats.outOfStock, href: '/admin/products', color: 'bg-red-500', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
    { label: 'Trending', value: stats.trending, href: '/admin/products', color: 'bg-blue-500', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Featured', value: stats.featured, href: '/admin/products', color: 'bg-indigo-500', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={card.icon} /></svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Low Stock Alerts</h3>
            <Link href="/admin/products" className="text-sm text-purple-600 hover:text-purple-700">View all</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {lowStockProducts.length === 0 ? (
              <p className="px-6 py-8 text-center text-gray-400 text-sm">No low stock items</p>
            ) : lowStockProducts.map((p) => (
              <div key={p.id} className="px-6 py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.set} · {p.productType}</p>
                </div>
                <div className="text-right ml-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.stock === 0 ? 'Out of Stock' : `${p.stock} left`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recently Updated</h3>
            <Link href="/admin/products" className="text-sm text-purple-600 hover:text-purple-700">View all</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentProducts.map((p) => (
              <Link key={p.id} href={`/admin/products/${p.id}`} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.set} · ${p.price.toFixed(2)}</p>
                </div>
                <span className="text-xs text-gray-400 ml-4">{new Date(p.updatedAt).toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between"><span className="text-sm text-gray-600">Total Inventory Value</span><span className="font-semibold">${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-600">Pokémon</span><span className="font-semibold">{getAllPokemon().length}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-600">Sets</span><span className="font-semibold">{getAllSets().length}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-600">Categories</span><span className="font-semibold">{getAllCategories().length}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-600">Sellers</span><span className="font-semibold">{getAllSellers().length}</span></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Add Product
            </Link>
            <Link href="/admin/products" className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search Products
            </Link>
            <Link href="/admin/pokemon" className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01" /></svg>
              Manage Pokémon
            </Link>
            <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              View Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
