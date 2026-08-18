'use client';

import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '@/types';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', image: '', description: '', cardCount: 0, popular: false });
  const [saving, setSaving] = useState(false);

  const fetchPokemon = useCallback(async () => {
    const res = await fetch('/api/pokemon');
    const data = await res.json();
    setPokemon(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPokemon(); }, [fetchPokemon]);

  const resetForm = () => {
    setForm({ name: '', slug: '', image: '', description: '', cardCount: 0, popular: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p: Pokemon) => {
    setForm({ name: p.name, slug: p.slug, image: p.image, description: p.description || '', cardCount: p.cardCount, popular: p.popular || false });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    if (editingId) {
      await fetch(`/api/pokemon/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
    } else {
      await fetch('/api/pokemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
    }
    resetForm();
    fetchPokemon();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this Pokémon?')) return;
    await fetch(`/api/pokemon/${id}`, { method: 'DELETE' });
    fetchPokemon();
  };

  const togglePopular = async (p: Pokemon) => {
    await fetch(`/api/pokemon/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ popular: !p.popular }),
    });
    fetchPokemon();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pokémon</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          + Add Pokémon
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{editingId ? 'Edit Pokémon' : 'New Pokémon'}</h3>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Count</label>
              <input
                type="number"
                value={form.cardCount}
                onChange={(e) => setForm({ ...form, cardCount: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Popular</span>
              </label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update Pokémon' : 'Create Pokémon'}
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
          <p className="text-sm text-gray-500">{pokemon.length} Pokémon</p>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : pokemon.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No Pokémon yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cards</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pokemon.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.image && (
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover bg-gray-100" />
                        )}
                        <span className="font-medium text-gray-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{p.slug}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{p.cardCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePopular(p)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          p.popular ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {p.popular ? '★ Popular' : '☆ Popular'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
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
