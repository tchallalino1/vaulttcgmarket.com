'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPopularPokemon } from '@/lib/pokemon';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';
import { Pokemon } from '@/types';

const pokemonCardCounts: Record<string, string> = {
  Charizard: '12,540+',
  Pikachu: '8,920+',
  Umbreon: '6,430+',
  Gengar: '5,210+',
  Mewtwo: '4,980+',
  Rayquaza: '4,210+',
  Eevee: '3,870+',
  Dragonite: '3,450+',
};

export function PopularPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPopularPokemon().then(setPokemon);
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#0c0a1a] via-[#120f24] to-[#0a0818] rounded-3xl border border-white/[0.06] px-8 py-10 mt-6 relative overflow-hidden">
      {/* Subtle purple glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/[0.07] rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">POPULAR POKÉMON</h2>
            <p className="text-sm text-gray-400 mt-0.5">The most collected. The most loved.</p>
          </div>
        </div>
        <Link href="/pokemon" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
          View all Pokémon
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>

      {/* Pokémon Grid */}
      <div className="relative grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
        {pokemon.map((p) => (
          <PokemonCircle key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  );
}

function PokemonCircle({ pokemon }: { pokemon: Pokemon }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = pokemon.pokemonTcgCardId
    ? getCardImageUrl(pokemon.pokemonTcgCardId, 'small')
    : null;
  const cardCount = pokemonCardCounts[pokemon.name] || `${pokemon.cardCount.toLocaleString()}+`;

  return (
    <Link href={`/pokemon/${pokemon.slug}`} className="group flex flex-col items-center">
      {/* Circle image */}
      <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full p-[2px] bg-gradient-to-br from-purple-500 via-purple-600 to-fuchsia-600 mb-3 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
        <div className="w-full h-full rounded-full overflow-hidden bg-[#120f24] flex items-center justify-center">
          {imageUrl && !imgError ? (
            <Image
              src={imageUrl}
              alt={pokemon.name}
              width={100}
              height={100}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <span className="text-2xl md:text-3xl font-bold text-purple-400/60">{pokemon.name.charAt(0)}</span>
          )}
        </div>
      </div>
      {/* Name */}
      <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
        {pokemon.name}
      </span>
      {/* Card count */}
      <span className="text-xs text-gray-500 mt-0.5">
        {cardCount} Cards
      </span>
    </Link>
  );
}
