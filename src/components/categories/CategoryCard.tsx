'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Category } from '@/types';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';

interface CategoryCardProps {
  category: Category;
}

const categoryCardIds: Record<string, string> = {
  singles: 'swsh8-215',      // Umbreon VMAX - popular modern card
  graded: 'base1-4',         // Base Set Charizard - classic graded icon
  sealed: 'swsh12-50',       // Crown Zenith card
  vintage: 'base1-4',        // Base Set Charizard - vintage icon
  accessories: '',           // No API image for accessories
};

export function CategoryCard({ category }: CategoryCardProps) {
  const [imgError, setImgError] = useState(false);
  let href = `/pokemon/${category.slug}`;
  if (category.slug === 'singles') href = '/pokemon';
  else if (category.slug === 'graded') href = '/graded';
  else if (category.slug === 'sealed') href = '/sealed';
  else if (category.slug === 'vintage') href = '/vintage';
  else if (category.slug === 'accessories') href = '/accessories';

  const cardId = categoryCardIds[category.slug];
  const imageUrl = cardId ? getCardImageUrl(cardId, 'small') : null;

  return (
    <Link href={href} className="group block">
      <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="h-[150px] bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors relative overflow-hidden">
          {imageUrl && !imgError ? (
            <Image
              src={imageUrl}
              alt={category.name}
              width={120}
              height={168}
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="text-gray-300">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{category.description}</p>
            </div>
            <div className="ml-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
