'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { WishlistButton } from '@/components/ui/WishlistButton';

interface AddToCartSectionProps {
  product: Product;
  inStock: boolean;
  isLowStock: boolean;
  hasDiscount: boolean;
  discountPercent: number;
}

export function AddToCartSection({ product, inStock, isLowStock, hasDiscount, discountPercent }: AddToCartSectionProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push('/cart');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through">${product.compareAtPrice!.toFixed(2)}</span>
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">-{discountPercent}%</span>
          </>
        )}
      </div>

      <div>
        {inStock ? (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-700 font-medium">In Stock</span>
            {isLowStock && <span className="text-xs text-amber-600">(Only {product.stock} left)</span>}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm text-red-700 font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {inStock && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium">-</button>
            <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
            <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium">+</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-3.5 px-6 rounded-lg font-semibold text-sm transition-all duration-200 ${
            added
              ? 'bg-green-600 text-white'
              : inStock
                ? 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!inStock}
          className={`w-full py-3.5 px-6 rounded-lg font-semibold text-sm border-2 transition-all duration-200 ${
            inStock
              ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          BUY NOW
        </button>
        <div className="flex justify-center pt-1">
          <WishlistButton productId={product.id} size="lg" />
        </div>
      </div>
    </div>
  );
}
