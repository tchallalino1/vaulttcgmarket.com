'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductType, Condition, Rarity, Language, GradingCompany } from '@/types';

const PRODUCT_TYPES: { type: ProductType; label: string; icon: string; description: string }[] = [
  { type: 'single', label: 'Single Card', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z', description: 'Raw Pokémon cards' },
  { type: 'graded', label: 'Graded Card', icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z', description: 'PSA, CGC, BGS, SGC' },
  { type: 'sealed', label: 'Sealed Product', icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z', description: 'Booster boxes, tins, etc.' },
  { type: 'vintage', label: 'Vintage', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', description: 'Classic & older cards' },
  { type: 'accessory', label: 'Accessory', icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z', description: 'Sleeves, binders, etc.' },
];

const CONDITIONS: Condition[] = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played', 'Damaged', 'Factory Sealed', 'Unopened'];
const RARITIES: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Ultra Rare', 'Secret Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
const LANGUAGES: Language[] = ['English', 'Japanese', 'Korean', 'Chinese', 'German', 'French', 'Spanish', 'Italian', 'Portuguese'];
const GRADING_COMPANIES: GradingCompany[] = ['PSA', 'CGC', 'BGS', 'SGC'];
const GRADES = ['10', '9.5', '9', '8.5', '8', '7.5', '7', '6.5', '6', '5.5', '5'];

interface PokemonTcgCard {
  id: string;
  name: string;
  number: string;
  set: { name: string };
  rarity?: string;
  images?: { small: string; large: string };
}

interface ProductFormProps {
  initialData?: Product;
  mode: 'create' | 'edit';
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importSearch, setImportSearch] = useState('');
  const [importResults, setImportResults] = useState<PokemonTcgCard[]>([]);
  const [importSearching, setImportSearching] = useState(false);
  const [importError, setImportError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    compareAtPrice: initialData?.compareAtPrice?.toString() || '',
    stock: initialData?.stock?.toString() || '1',
    sku: '',
    language: (initialData?.language || 'English') as Language,
    status: ((initialData?.stock ?? 0) > 0 ? 'published' : 'draft') as 'published' | 'draft' | 'archived',
    productType: (initialData?.productType || 'single') as ProductType,
    pokemon: initialData?.pokemon || '',
    set: initialData?.set || '',
    cardNumber: initialData?.cardNumber || '',
    rarity: (initialData?.rarity || 'Common') as Rarity,
    condition: (initialData?.condition || 'Near Mint') as Condition,
    gradingCompany: (initialData?.gradingCompany || 'PSA') as GradingCompany,
    grade: initialData?.grade || '10',
    certificationNumber: initialData?.certificationNumber || '',
    vintageYear: '',
    accessoryCategory: '',
    images: initialData?.images || [] as string[],
    seoTitle: initialData?.name || '',
    seoDescription: initialData?.description || '',
    slug: initialData?.slug || '',
    featured: initialData?.featured || false,
    trending: initialData?.trending || false,
    pokemonTcgCardId: initialData?.pokemonTcgCardId || '',
  });

  const updateField = useCallback((field: string, value: unknown) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'name' && mode === 'create') {
        next.slug = (value as string)
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .slice(0, 100);
        if (!prev.seoTitle || prev.seoTitle === prev.name) {
          next.seoTitle = value as string;
        }
      }
      return next;
    });
  }, [mode]);

  async function handleImportSearch() {
    if (!importSearch.trim()) return;
    setImportSearching(true);
    setImportError('');
    try {
      const res = await fetch(`/api/pokemon-tcg/search?q=${encodeURIComponent(importSearch)}&pageSize=10`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setImportResults(data.data || []);
      if (!data.data?.length) setImportError('No cards found.');
    } catch {
      setImportError('Failed to search. Please try again.');
    } finally {
      setImportSearching(false);
    }
  }

  function handleImportCard(card: PokemonTcgCard) {
    const rarityMatch = RARITIES.find((r) => r.toLowerCase() === (card.rarity || '').toLowerCase());
    setForm((prev) => ({
      ...prev,
      name: `${card.name} — ${card.set.name}`,
      pokemon: card.name,
      set: card.set.name,
      cardNumber: card.number,
      rarity: rarityMatch || 'Common',
      pokemonTcgCardId: card.id,
      images: card.images ? [card.images.large || card.images.small] : prev.images,
      seoTitle: `${card.name} ${card.set.name} #${card.number}`,
      slug: `${card.name}-${card.set.name}-${card.number}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    }));
    setShowImportModal(false);
    setImportSearch('');
    setImportResults([]);
  }

  function addImageUrl(url: string) {
    if (!url.trim()) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, url.trim()] }));
  }

  function removeImage(index: number) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent, status: 'published' | 'draft') {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      productType: form.productType,
      category: form.productType === 'single' ? 'singles' : form.productType === 'graded' ? 'graded' : form.productType === 'sealed' ? 'sealed' : form.productType === 'vintage' ? 'vintage' : 'accessories',
      price: parseFloat(form.price) || 0,
      compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : undefined,
      stock: status === 'published' ? Math.max(1, parseInt(form.stock) || 0) : 0,
      images: form.images,
      condition: form.condition,
      language: form.language,
      set: form.set || undefined,
      cardNumber: form.cardNumber || undefined,
      rarity: form.rarity,
      pokemon: form.pokemon || undefined,
      gradingCompany: form.productType === 'graded' ? form.gradingCompany : undefined,
      grade: form.productType === 'graded' ? form.grade : undefined,
      certificationNumber: form.productType === 'graded' ? form.certificationNumber || undefined : undefined,
      pokemonTcgCardId: form.pokemonTcgCardId || undefined,
      featured: form.featured,
      trending: form.trending,
    };

    try {
      const url = mode === 'create' ? '/api/products' : `/api/products/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save');
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/admin/products');
        router.refresh();
      }, 1500);
    } catch {
      alert('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl">
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-green-800">
            {mode === 'create' ? 'Product created successfully!' : 'Product updated successfully!'}
          </p>
        </div>
      )}

      {/* Step 1: Product Type */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">1. Product Type</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PRODUCT_TYPES.map((pt) => (
            <button
              key={pt.type}
              type="button"
              onClick={() => updateField('productType', pt.type)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                form.productType === pt.type
                  ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <svg className={`w-6 h-6 mb-2 ${form.productType === pt.type ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={pt.icon} />
              </svg>
              <p className={`text-sm font-medium ${form.productType === pt.type ? 'text-purple-900' : 'text-gray-900'}`}>{pt.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{pt.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Pokemon TCG Import */}
      {form.productType === 'single' && (
        <section className="mb-8">
          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="w-full p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold text-sm hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            IMPORT FROM POKÉMON TCG API
          </button>
          {form.pokemonTcgCardId && (
            <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Card imported from Pokémon TCG API
            </p>
          )}
        </section>
      )}

      {/* Step 3: Product Information */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">3. Product Information</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. Charizard VMAX — Darkness Ablaze"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Product description..."
            />
          </div>

          {/* Price Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compare-at Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.compareAtPrice}
                  onChange={(e) => updateField('compareAtPrice', e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
              <input
                type="number"
                required
                min="0"
                value={form.stock}
                onChange={(e) => updateField('stock', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* SKU & Language */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                value={form.sku}
                onChange={(e) => updateField('sku', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={form.language}
                onChange={(e) => updateField('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex gap-3">
              {(['published', 'draft', 'archived'] as const).map((s) => (
                <label key={s} className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                  form.status === s ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}>
                  <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => updateField('status', s)} className="sr-only" />
                  <span className="text-sm font-medium capitalize">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type-specific fields: Singles & Graded */}
          {(form.productType === 'single' || form.productType === 'graded' || form.productType === 'vintage') && (
            <>
              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Card Details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pokémon</label>
                    <input
                      type="text"
                      value={form.pokemon}
                      onChange={(e) => updateField('pokemon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g. Charizard"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Set</label>
                    <input
                      type="text"
                      value={form.set}
                      onChange={(e) => updateField('set', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g. Darkness Ablaze"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={(e) => updateField('cardNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g. 010"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rarity</label>
                    <select
                      value={form.rarity}
                      onChange={(e) => updateField('rarity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {RARITIES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                    <select
                      value={form.condition}
                      onChange={(e) => updateField('condition', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {CONDITIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  {form.productType === 'vintage' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={form.vintageYear}
                        onChange={(e) => updateField('vintageYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g. 1999"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Grading fields */}
              {form.productType === 'graded' && (
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Grading Details</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grading Company</label>
                      <select
                        value={form.gradingCompany}
                        onChange={(e) => updateField('gradingCompany', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {GRADING_COMPANIES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                      <select
                        value={form.grade}
                        onChange={(e) => updateField('grade', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {GRADES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Certification #</label>
                      <input
                        type="text"
                        value={form.certificationNumber}
                        onChange={(e) => updateField('certificationNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g. 12345678"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Sealed fields */}
          {form.productType === 'sealed' && (
            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sealed Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Set</label>
                  <input
                    type="text"
                    value={form.set}
                    onChange={(e) => updateField('set', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g. Scarlet & Violet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select
                    value={form.condition}
                    onChange={(e) => updateField('condition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Factory Sealed">Factory Sealed</option>
                    <option value="Unopened">Unopened</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Accessory fields */}
          {form.productType === 'accessory' && (
            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Accessory Details</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={form.accessoryCategory}
                  onChange={(e) => updateField('accessoryCategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g. Sleeves, Binders, Dice"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Step 4: Images */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">4. Images</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              placeholder="Paste image URL..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addImageUrl((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>('[placeholder="Paste image URL..."]');
                if (input) {
                  addImageUrl(input.value);
                  input.value = '';
                }
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Add Image
            </button>
          </div>
          {form.images.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {form.images.map((url, i) => (
                <div key={i} className="relative group aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <p className="text-sm text-gray-400">No images added yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Step 5: SEO */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">5. SEO</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">{form.seoTitle.length}/60 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
            <textarea
              value={form.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{form.seoDescription.length}/160 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">/products/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Step 6: Publishing */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">6. Publishing</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField('featured', e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.trending}
                onChange={(e) => updateField('trending', e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Trending</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={(e) => handleSubmit(e as React.FormEvent, 'draft')}
              disabled={saving || !form.name || !form.price}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e as React.FormEvent, 'published')}
              disabled={saving || !form.name || !form.price}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </section>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowImportModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Import from Pokémon TCG API</h3>
              <button onClick={() => setShowImportModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for a Pokémon card..."
                  value={importSearch}
                  onChange={(e) => setImportSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleImportSearch()}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={handleImportSearch}
                  disabled={importSearching}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                >
                  {importSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {importError && <p className="text-sm text-red-600 px-2 mb-2">{importError}</p>}
              {importResults.map((card) => (
                <div key={card.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-100 mb-2">
                  {card.images?.small && (
                    <img src={card.images.small} alt={card.name} className="w-12 h-16 object-contain flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{card.name}</p>
                    <p className="text-xs text-gray-500">{card.set.name} · #{card.number}</p>
                    {card.rarity && <p className="text-xs text-purple-600">{card.rarity}</p>}
                  </div>
                  <button
                    onClick={() => handleImportCard(card)}
                    className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 flex-shrink-0"
                  >
                    Import
                  </button>
                </div>
              ))}
              {importSearching && (
                <div className="py-8 text-center">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
