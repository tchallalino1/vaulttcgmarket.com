'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const productTypeLabels: Record<string, string> = {
  single: 'Raw',
  graded: 'Graded',
  sealed: 'Sealed',
  vintage: 'Vintage',
  accessory: 'Accessory',
};

const gradientColors: Record<string, string> = {
  Charizard: 'from-orange-400 to-red-500',
  Pikachu: 'from-yellow-400 to-yellow-500',
  Umbreon: 'from-indigo-800 to-gray-900',
  Gengar: 'from-purple-600 to-indigo-900',
  Mewtwo: 'from-purple-400 to-blue-600',
  Rayquaza: 'from-green-500 to-emerald-700',
  Eevee: 'from-amber-600 to-orange-700',
  Dragonite: 'from-orange-500 to-amber-600',
  default: 'from-purple-500 to-indigo-600',
};

function getGradient(pokemon?: string): string {
  if (!pokemon) return gradientColors.default;
  return gradientColors[pokemon] || gradientColors.default;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradeLabel = product.gradingCompany && product.grade
    ? `${product.gradingCompany} ${product.grade}`
    : product.condition || null;

  const imageUrl = product.pokemonTcgCardId
    ? getCardImageUrl(product.pokemonTcgCardId, 'large')
    : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Card image area */}
          <div className={`w-full h-full bg-gradient-to-br ${getGradient(product.pokemon)} flex items-center justify-center`}>
            {imageUrl && !imgError ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                onError={() => setImgError(true)}
                unoptimized
              />
            ) : (
              <div className="text-white/90 text-center p-4">
                <div className="text-4xl mb-2 opacity-30">🃏</div>
                <p className="font-bold text-sm leading-tight drop-shadow-lg">{product.name}</p>
                {product.cardNumber && (
                  <p className="text-white/70 text-xs mt-1">{product.cardNumber}</p>
                )}
              </div>
            )}
          </div>

          {/* Type badge */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge variant={product.productType === 'graded' ? 'info' : product.productType === 'sealed' ? 'success' : 'purple'}>
              {productTypeLabels[product.productType] || product.productType}
            </Badge>
          </div>

          {/* Wishlist button */}
          <div className="absolute top-2 right-2">
            <WishlistButton productId={product.id} />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm line-clamp-1 mb-0.5 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-1">
          {product.set}{product.cardNumber ? ` ${product.cardNumber}` : ''}
        </p>
        {gradeLabel && (
          <div className="mb-2">
            <Badge variant="info" size="sm">{gradeLabel}</Badge>
          </div>
        )}
        <div className="mt-auto">
          <PriceDisplay
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            priceChangePercent={product.priceChangePercent}
            currency={product.currency}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
