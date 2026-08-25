'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { getTrendingProducts } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';

export function TrendingProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { getTrendingProducts().then(setProducts); }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="w-full mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">TRENDING NOW</h2>
        <Link href="/products?sort=trending" className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1">
          View all
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>

      <div className="relative group">
        <button onClick={() => scroll('left')} className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 hidden sm:flex" aria-label="Scroll left">
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {products.map((product) => (
            <div key={product.id} className="flex-none w-[150px] sm:w-[170px] md:w-[185px] snap-start">
              <ProductCard product={product} compact />
            </div>
          ))}
        </div>

        <button onClick={() => scroll('right')} className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-3 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 hidden sm:flex" aria-label="Scroll right">
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}
