'use client';

import { useState, useMemo } from 'react';
import { getAllProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Product, ProductType, Rarity, Condition, GradingCompany, Language } from '@/types';

const POKEMON_LIST = ['Charizard', 'Pikachu', 'Umbreon', 'Gengar', 'Mewtwo', 'Rayquaza', 'Eevee', 'Dragonite'] as const;
const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'single', label: 'Singles' },
  { value: 'graded', label: 'Graded' },
  { value: 'sealed', label: 'Sealed' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'accessory', label: 'Accessories' },
];
const RARITIES: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Ultra Rare', 'Secret Rare', 'Illustration Rare', 'Special Illustration Rare'];
const CONDITIONS: Condition[] = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played', 'Damaged', 'Factory Sealed', 'Unopened'];
const GRADING_COMPANIES: GradingCompany[] = ['PSA', 'CGC', 'BGS'];
const LANGUAGES: Language[] = ['English', 'Japanese'];
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'trending', label: 'Trending' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];

interface Filters {
  pokemon: string[];
  productType: ProductType[];
  rarity: Rarity[];
  condition: Condition[];
  gradingCompany: GradingCompany[];
  language: Language[];
  minPrice: string;
  maxPrice: string;
}

const initialFilters: Filters = {
  pokemon: [],
  productType: [],
  rarity: [],
  condition: [],
  gradingCompany: [],
  language: [],
  minPrice: '',
  maxPrice: '',
};

export default function PokemonPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    pokemon: true,
    productType: true,
    rarity: true,
    condition: true,
    gradingCompany: true,
    language: true,
    priceRange: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = <K extends keyof Filters>(key: K, value: Filters[K][number]) => {
    setFilters((prev) => {
      const current = prev[key] as string[];
      const next = current.includes(value as string)
        ? current.filter((v) => v !== value)
        : [...current, value as string];
      return { ...prev, [key]: next };
    });
  };

  const removeFilter = (key: keyof Filters, value?: string) => {
    setFilters((prev) => {
      if (key === 'minPrice' || key === 'maxPrice') {
        return { ...prev, [key]: '' };
      }
      return { ...prev, [key]: (prev[key] as string[]).filter((v) => v !== value) };
    });
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.pokemon.length;
    count += filters.productType.length;
    count += filters.rarity.length;
    count += filters.condition.length;
    count += filters.gradingCompany.length;
    count += filters.language.length;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (searchQuery) count++;
    return count;
  }, [filters, searchQuery]);

  const activeFilterLabels = useMemo(() => {
    const labels: { key: keyof Filters; value: string; label: string }[] = [];
    filters.pokemon.forEach((v) => labels.push({ key: 'pokemon', value: v, label: v }));
    filters.productType.forEach((v) => {
      const found = PRODUCT_TYPES.find((pt) => pt.value === v);
      labels.push({ key: 'productType', value: v, label: found?.label || v });
    });
    filters.rarity.forEach((v) => labels.push({ key: 'rarity', value: v, label: v }));
    filters.condition.forEach((v) => labels.push({ key: 'condition', value: v, label: v }));
    filters.gradingCompany.forEach((v) => labels.push({ key: 'gradingCompany', value: v, label: v }));
    filters.language.forEach((v) => labels.push({ key: 'language', value: v, label: v }));
    if (filters.minPrice) labels.push({ key: 'minPrice', value: filters.minPrice, label: `Min: $${filters.minPrice}` });
    if (filters.maxPrice) labels.push({ key: 'maxPrice', value: filters.maxPrice, label: `Max: $${filters.maxPrice}` });
    if (searchQuery) labels.push({ key: 'pokemon', value: '__search__', label: `"${searchQuery}"` });
    return labels;
  }, [filters, searchQuery]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.set?.toLowerCase().includes(q) ||
          p.pokemon?.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.pokemon.length > 0) {
      result = result.filter((p) => p.pokemon && filters.pokemon.includes(p.pokemon));
    }
    if (filters.productType.length > 0) {
      result = result.filter((p) => filters.productType.includes(p.productType));
    }
    if (filters.rarity.length > 0) {
      result = result.filter((p) => p.rarity && filters.rarity.includes(p.rarity));
    }
    if (filters.condition.length > 0) {
      result = result.filter((p) => p.condition && filters.condition.includes(p.condition));
    }
    if (filters.gradingCompany.length > 0) {
      result = result.filter((p) => p.gradingCompany && filters.gradingCompany.includes(p.gradingCompany));
    }
    if (filters.language.length > 0) {
      result = result.filter((p) => p.language && filters.language.includes(p.language));
    }
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min)) result = result.filter((p) => p.price >= min);
    }
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max)) result = result.filter((p) => p.price <= max);
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'trending':
        result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [allProducts, searchQuery, filters, sortBy]);

  const FilterSection = ({ title, sectionKey, children }: { title: string; sectionKey: string; children: React.ReactNode }) => (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-gray-900 hover:text-purple-600 transition-colors"
      >
        {title}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openSections[sectionKey] ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {openSections[sectionKey] && <div className="pb-3 space-y-1.5">{children}</div>}
    </div>
  );

  const CheckboxItem = ({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count?: number }) => (
    <label className="flex items-center gap-2.5 py-1 cursor-pointer group">
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
          checked ? 'bg-purple-600 border-purple-600' : 'border-gray-300 group-hover:border-purple-400'
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
      {count !== undefined && <span className="text-xs text-gray-400 ml-auto">{count}</span>}
    </label>
  );

  const FilterSidebar = () => (
    <aside className="space-y-0">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Filters</h3>
          {activeFilterCount > 0 && (
            <button onClick={clearAllFilters} className="text-xs text-purple-600 hover:text-purple-700 font-medium">
              Clear All
            </button>
          )}
        </div>

        <FilterSection title="Pokémon" sectionKey="pokemon">
          {POKEMON_LIST.map((pokemon) => (
            <CheckboxItem
              key={pokemon}
              checked={filters.pokemon.includes(pokemon)}
              onChange={() => toggleFilter('pokemon', pokemon)}
              label={pokemon}
            />
          ))}
        </FilterSection>

        <FilterSection title="Product Type" sectionKey="productType">
          {PRODUCT_TYPES.map((pt) => (
            <CheckboxItem
              key={pt.value}
              checked={filters.productType.includes(pt.value)}
              onChange={() => toggleFilter('productType', pt.value)}
              label={pt.label}
            />
          ))}
        </FilterSection>

        <FilterSection title="Rarity" sectionKey="rarity">
          {RARITIES.map((r) => (
            <CheckboxItem
              key={r}
              checked={filters.rarity.includes(r)}
              onChange={() => toggleFilter('rarity', r)}
              label={r}
            />
          ))}
        </FilterSection>

        <FilterSection title="Condition" sectionKey="condition">
          {CONDITIONS.map((c) => (
            <CheckboxItem
              key={c}
              checked={filters.condition.includes(c)}
              onChange={() => toggleFilter('condition', c)}
              label={c}
            />
          ))}
        </FilterSection>

        <FilterSection title="Grading Company" sectionKey="gradingCompany">
          {GRADING_COMPANIES.map((g) => (
            <CheckboxItem
              key={g}
              checked={filters.gradingCompany.includes(g)}
              onChange={() => toggleFilter('gradingCompany', g)}
              label={g}
            />
          ))}
        </FilterSection>

        <FilterSection title="Language" sectionKey="language">
          {LANGUAGES.map((l) => (
            <CheckboxItem
              key={l}
              checked={filters.language.includes(l)}
              onChange={() => toggleFilter('language', l)}
              label={l}
            />
          ))}
        </FilterSection>

        <FilterSection title="Price Range" sectionKey="priceRange">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <span className="text-gray-300">–</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </FilterSection>
      </div>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase text-gray-900 mb-2">POKÉMON CARDS</h1>
        <p className="text-gray-500">Explore singles, graded cards, sealed products and collectibles from across the Pokémon TCG.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-xl">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search Pokémon cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterLabels.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {activeFilterLabels.map((filter, idx) => (
            <button
              key={`${filter.key}-${filter.value}-${idx}`}
              onClick={() => {
                if (filter.key === 'minPrice' || filter.key === 'maxPrice') {
                  removeFilter(filter.key);
                } else if (filter.value === '__search__') {
                  setSearchQuery('');
                } else {
                  removeFilter(filter.key, filter.value);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full hover:bg-purple-100 transition-colors"
            >
              {filter.label}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium underline ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar: Results count, Mobile filter button, Sort */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{allProducts.length}</span> products
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No cards found</h3>
              <p className="text-gray-500 mb-4">Try changing your filters or search for another Pokémon.</p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <FilterSidebar />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-5">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Show {filteredProducts.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
