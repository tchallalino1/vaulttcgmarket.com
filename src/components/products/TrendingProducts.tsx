'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { getTrendingProducts } from '@/lib/products';
import { ProductCard } from './ProductCard';

export function TrendingProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => { getTrendingProducts().then(setProducts); }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-wide">TRENDING NOW</h2>
        <Link
          href="/products?sort=trending"
          className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
        >
          View all
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[200px] sm:w-[220px] md:w-[240px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
