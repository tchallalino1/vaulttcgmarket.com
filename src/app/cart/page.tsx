'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, shipping, tax, total, totalItems } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">SHOPPING CART ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>

      {items.length === 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any items yet.</p>
              <Link href="/pokemon" className="inline-flex items-center justify-center bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors">
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium">$0.00</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span className="text-gray-500">Calculated at checkout</span></div>
                <div className="border-t pt-3 flex justify-between"><span className="font-semibold">Estimated Total</span><span className="font-bold">$0.00</span></div>
              </div>
              <button disabled className="w-full mt-6 bg-red-600 text-white py-3 px-6 rounded-lg font-medium opacity-50 cursor-not-allowed">CHECKOUT</button>
              <Link href="/pokemon" className="block text-center mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium">CONTINUE SHOPPING</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex gap-4">
                <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 flex-shrink-0 relative">
                  {product.pokemonTcgCardId ? (
                    <Image src={getCardImageUrl(product.pokemonTcgCardId, 'small')} alt={product.name} fill className="object-contain" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🃏</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/products/${product.slug}`} className="font-semibold text-sm sm:text-base hover:text-purple-600 transition-colors line-clamp-1">{product.name}</Link>
                      <p className="text-xs text-gray-500 mt-0.5">{product.set}{product.cardNumber ? ` ${product.cardNumber}` : ''}</p>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm">-</button>
                      <span className="w-8 text-center font-medium text-sm">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm">+</button>
                    </div>
                    <span className="font-bold text-sm">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/pokemon" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium mt-4">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Continue Shopping
            </Link>
          </div>

          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal ({totalItems} items)</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span className="font-medium">{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Estimated Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
                <div className="border-t pt-3 flex justify-between"><span className="font-semibold">Total</span><span className="font-bold text-lg">${total.toFixed(2)}</span></div>
              </div>
              {shipping === 0 && subtotal > 0 && (
                <div className="bg-green-50 text-green-700 text-xs rounded-lg p-3 mb-4 text-center">You qualify for FREE shipping!</div>
              )}
              <Link href="/checkout" className="block w-full bg-red-600 text-white py-3.5 px-6 rounded-lg font-semibold text-sm text-center hover:bg-red-700 transition-colors">
                PROCEED TO CHECKOUT
              </Link>
              <Link href="/pokemon" className="block text-center mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium">CONTINUE SHOPPING</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
