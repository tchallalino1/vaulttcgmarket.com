'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getFeaturedProduct } from '@/lib/products';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';
import { MarketTrendCard } from './MarketTrendCard';
import { TrustFeatures } from './TrustFeatures';

export function HeroSection() {
  const featured = getFeaturedProduct();
  const [imgError, setImgError] = useState(false);

  const imageUrl = featured?.pokemonTcgCardId
    ? getCardImageUrl(featured.pokemonTcgCardId, 'large')
    : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0a0a1a] min-h-[580px]">
      {/* Radial purple glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Star dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[420px]">
          {/* Left content */}
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium">
              ✦ The Most Trusted Marketplace for Pokémon TCG
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
              Your Collection.
              <br />
              <span className="text-purple-400" style={{ textShadow: '0 0 30px rgba(168,85,247,0.5), 0 0 60px rgba(168,85,247,0.2)' }}>
                Your Legacy.
              </span>
            </h1>

            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              Discover rare cards, graded treasures, and sealed collectibles from trusted sellers around the world.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/pokemon"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors duration-200 text-sm"
              >
                SHOP POKÉMON CARDS →
              </Link>
              <Link
                href="/market"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium rounded-lg px-6 py-3 transition-colors duration-200 text-sm"
              >
                EXPLORE MARKET
              </Link>
            </div>

            <div className="mt-8">
              <TrustFeatures />
            </div>
          </div>

          {/* Right content */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {featured && (
              <div className="relative">
                {/* Card glow */}
                <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-[60px] scale-110" />

                {/* Featured card */}
                <div className="relative animate-[float_6s_ease-in-out_infinite]">
                  <div
                    className="relative w-[300px] h-[420px] sm:w-[340px] sm:h-[470px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-800 to-gray-900"
                    style={{
                      boxShadow: '0 25px 80px -12px rgba(168,85,247,0.4), 0 10px 40px -8px rgba(0,0,0,0.6)',
                      transform: 'rotate(3deg)',
                    }}
                  >
                    {imageUrl && !imgError ? (
                      <Image
                        src={imageUrl}
                        alt={featured.name}
                        fill
                        className="object-contain"
                        priority
                        onError={() => setImgError(true)}
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white/80">
                          <div className="text-6xl mb-4 opacity-30">🃏</div>
                          <p className="font-bold text-lg">{featured.name}</p>
                          {featured.cardNumber && (
                            <p className="text-white/50 text-sm mt-1">{featured.cardNumber}</p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                  </div>
                </div>

                {/* Market trend card */}
                <div className="absolute -bottom-6 -left-8 sm:-left-12 z-20">
                  <MarketTrendCard />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: rotate(3deg) translateY(0px); }
          50% { transform: rotate(3deg) translateY(-16px); }
        }
      `}</style>
    </section>
  );
}
