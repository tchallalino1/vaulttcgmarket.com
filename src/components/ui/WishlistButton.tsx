'use client';
import { useState } from 'react';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizeClasses: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function WishlistButton({
  productId: _productId,
  className = '',
  size = 'md',
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  function toggleWishlist() {
    setIsWishlisted((prev) => !prev);
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
        isWishlisted
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-500'
      } ${sizeClasses[size]} ${className}`}
    >
      <svg
        className={iconSizeClasses[size]}
        viewBox="0 0 24 24"
        fill={isWishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
