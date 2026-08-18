'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, Pokemon } from '@/types';

interface HomepageSettings {
  heroTitle: string;
  heroSubtitle: string;
  featuredProductId: string;
  popularPokemonIds: string[];
  trendingMode: 'automatic' | 'manual';
}

const defaultSettings: HomepageSettings = {
  heroTitle: 'Vault TCG Market',
  heroSubtitle: 'The ultimate marketplace for Pokémon TCG collectors',
  featuredProductId: '',
  popularPokemonIds: [],
  trendingMode: 'automatic',
};

export default function HomepageCMSPage() {
  const [settings, setSettings] = useState<HomepageSettings>(defaultSettings);
  const [products, setProducts] = useState<Product[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchData = useCallback(async () => {
    const [prodRes, pokeRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/pokemon'),
    ]);
    setProducts(await prodRes.json());
    setPokemon(await pokeRes.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    setSaving(true);
    // In production, this would POST to an API to persist settings
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const togglePopularPokemon = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      popularPokemonIds: prev.popularPokemonIds.includes(id)
        ? prev.popularPokemonIds.filter((p) => p !== id)
        : [...prev.popularPokemonIds, id],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Homepage Content</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Hero Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
              <input
                type="text"
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Featured Product */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured Product
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select featured product</label>
            <select
              value={settings.featuredProductId}
              onChange={(e) => setSettings({ ...settings, featuredProductId: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">None</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — ${p.price.toFixed(2)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Pokémon */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg>
            Popular Pokémon
            <span className="text-xs font-normal text-gray-400 ml-auto">{settings.popularPokemonIds.length} selected</span>
          </h3>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {pokemon.map((p) => (
              <label
                key={p.id}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  settings.popularPokemonIds.includes(p.id) ? 'bg-purple-50' : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={settings.popularPokemonIds.includes(p.id)}
                  onChange={() => togglePopularPokemon(p.id)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{p.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Trending Mode */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Trending Mode
          </h3>
          <div className="space-y-3">
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              settings.trendingMode === 'automatic' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <input
                type="radio"
                name="trendingMode"
                value="automatic"
                checked={settings.trendingMode === 'automatic'}
                onChange={(e) => setSettings({ ...settings, trendingMode: e.target.value as 'automatic' })}
                className="text-purple-600 focus:ring-purple-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Automatic</p>
                <p className="text-xs text-gray-500">Trending products are determined by sales velocity and views</p>
              </div>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              settings.trendingMode === 'manual' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
            }`}>
              <input
                type="radio"
                name="trendingMode"
                value="manual"
                checked={settings.trendingMode === 'manual'}
                onChange={(e) => setSettings({ ...settings, trendingMode: e.target.value as 'manual' })}
                className="text-purple-600 focus:ring-purple-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Manual</p>
                <p className="text-xs text-gray-500">Manually select which products appear in trending</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
