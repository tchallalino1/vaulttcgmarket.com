'use client';

import { useState, useEffect, useCallback } from 'react';
import { PokemonSet } from '@/types';

export default function SetsPage() {
  const [sets, setSets] = useState<PokemonSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', series: '', releaseDate: '', totalCards: 0, logo: '', image: '' });
  const [saving, setSaving] = useState(false);

  const fetchSets = useCallback(async () => {
    const res = await fetch('/api/sets');
    const data = await res.json();
    setSets(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSets(); }, [fetchSets]);

  const resetForm = () => {
    setForm({ name: '', slug: '', series: '', releaseDate: '', totalCards: 0, logo: '', image: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (s: PokemonSet) => {
    setForm({ name: s.name, slug: s.slug, series: s.series || '', releaseDate: s.releaseDate, totalCards: s.totalCards, logo: s.logo || '', image: s.image || '' });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    if (editingId) {
      await fetch(`/api/sets/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
    } else {
      await fetch('/api/sets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
    }
    resetForm();
    fetchSets();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this set?')) return;
    await fetch(`/api/sets/${id}`, { method: 'DELETE' });
    fetchSets();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sets</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          + Add Set
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{editingId ? 'Edit Set' : 'New Set'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Series</label>
              <input
                type="text"
                value={form.series}
                onChange={(e) => setForm({ ...form, series: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
              <input
                type="text"
                value={form.releaseDate}
                onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
                placeholder="YYYY-MM-DD"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Cards</label>
              <input
                type="number"
                value={form.totalCards}
                onChange={(e) => setForm({ ...form, totalCards: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
              <input
                type="text"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update Set' : 'Create Set'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">{sets.length} sets</p>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : sets.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No sets yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Series</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Release Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cards</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sets.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {s.logo && (
                          <img src={s.logo} alt={s.name} className="w-8 h-8 rounded object-cover bg-gray-100" />
                        )}
                        <div>
                          <span className="font-medium text-gray-900">{s.name}</span>
                          <p className="text-xs text-gray-400">{s.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {s.series ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {s.series}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{s.releaseDate || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{s.totalCards}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
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
