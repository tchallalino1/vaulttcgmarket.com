'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getAllCategories } from '@/lib/categories';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';
import { useEffect } from 'react';
import { Category } from '@/types';

const categoryCardIds: Record<string, string> = {
  singles: 'sv3pt5-174',
  graded: 'base1-4',
  sealed: 'swsh12-50',
  vintage: 'base1-4',
  accessories: '',
};

const categoryIcons: Record<string, string> = {
  singles: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  graded: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  sealed: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  vintage: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  accessories: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
};

const categoryHrefs: Record<string, string> = {
  singles: '/pokemon',
  graded: '/graded',
  sealed: '/sealed',
  vintage: '/vintage',
  accessories: '/accessories',
};

export function ExploreByType() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <section className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 px-8 py-10 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">EXPLORE BY TYPE</h2>
            <p className="text-sm text-gray-500 mt-0.5">Find exactly what you&apos;re looking for.</p>
          </div>
        </div>
        <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
          View all categories
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const [imgError, setImgError] = useState(false);
  const href = categoryHrefs[category.slug] || '/products';
  const cardId = categoryCardIds[category.slug];
  const imageUrl = cardId ? getCardImageUrl(cardId, 'small') : null;
  const iconPath = categoryIcons[category.slug] || categoryIcons.singles;

  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
        {/* Image area */}
        <div className="relative h-[160px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {imageUrl && !imgError ? (
            <Image
              src={imageUrl}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
            </div>
          )}
          {/* Purple icon badge */}
          <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/30 z-10">
            <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={iconPath} />
            </svg>
          </div>
        </div>

        {/* Info area */}
        <div className="pt-6 pb-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-900 mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{category.description}</p>
            </div>
            <div className="ml-2 w-7 h-7 rounded-full bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
