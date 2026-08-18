'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/types';
import { useState } from 'react';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = pokemon.pokemonTcgCardId
    ? getCardImageUrl(pokemon.pokemonTcgCardId, 'small')
    : null;

  return (
    <Link href={`/pokemon/${pokemon.slug}`} className="group flex flex-col items-center flex-shrink-0">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gradient-to-br from-purple-200 via-purple-100 to-fuchsia-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm group-hover:shadow-md border-2 border-white">
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={pokemon.name}
            width={100}
            height={100}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <span className="text-3xl font-bold text-purple-700">{pokemon.name.charAt(0)}</span>
        )}
      </div>
      <span className="mt-3 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
        {pokemon.name}
      </span>
    </Link>
  );
}
