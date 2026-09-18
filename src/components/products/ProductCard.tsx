'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { getTcgdexImageUrl } from '@/lib/tcgdex';
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

  // Category-aware image selection
  const imageUrl = (() => {
    // Use uploaded product images first (if valid HTTP URL)
    if (product.images && product.images.length > 0 && product.images[0].startsWith('http')) {
      return product.images[0];
    }
    // For singles, graded, vintage — use TCGdex card image
    if ((product.productType === 'single' || product.productType === 'graded' || product.productType === 'vintage') && product.pokemonTcgCardId) {
      return getTcgdexImageUrl(product.pokemonTcgCardId);
    }
    // For sealed and accessories — no card image (show placeholder)
    return null;
  })();

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center ${product.productType === 'sealed' ? 'bg-gradient-to-br from-green-50 to-emerald-100' : product.productType === 'accessory' ? 'bg-gradient-to-br from-rose-50 to-pink-100' : 'bg-gradient-to-br from-purple-100 to-purple-200'}`}>
              {product.productType === 'sealed' ? (
                <>
                  <svg className="w-16 h-16 text-green-300 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 3v18" />
                  </svg>
                  <span className="text-xs font-medium text-green-600">{product.name}</span>
                </>
              ) : product.productType === 'accessory' ? (
                <>
                  <svg className="w-16 h-16 text-rose-300 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  <span className="text-xs font-medium text-rose-600">{product.name}</span>
                </>
              ) : (
                <span className="text-3xl opacity-30">🃏</span>
              )}
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
