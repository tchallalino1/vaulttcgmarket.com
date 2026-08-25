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
  compact?: boolean;
}

const productTypeLabels: Record<string, string> = {
  single: 'Raw', graded: 'Graded', sealed: 'Sealed', vintage: 'Vintage', accessory: 'Accessory',
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradeLabel = product.gradingCompany && product.grade
    ? `${product.gradingCompany} ${product.grade}`
    : product.condition || null;

  const imageUrl = product.pokemonTcgCardId
    ? getCardImageUrl(product.pokemonTcgCardId, 'small')
    : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          {imageUrl && !imgError ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
              <span className="text-3xl opacity-30">🃏</span>
            </div>
          )}
          <div className="absolute top-1.5 left-1.5">
            <Badge variant={product.productType === 'graded' ? 'info' : product.productType === 'sealed' ? 'success' : 'purple'}>
              {productTypeLabels[product.productType]}
            </Badge>
          </div>
          <div className="absolute top-1.5 right-1.5">
            <WishlistButton productId={product.id} size="sm" />
          </div>
        </div>
      </Link>

      <div className={`${compact ? 'p-2.5' : 'p-3'} flex flex-col flex-1`}>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-xs line-clamp-1 mb-0.5 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-gray-400 mb-1 line-clamp-1">
          {product.set}{product.cardNumber ? ` ${product.cardNumber}` : ''}
        </p>
        {gradeLabel && (
          <div className="mb-1.5">
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
