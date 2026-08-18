import Link from 'next/link';
import { getPopularPokemon } from '@/lib/pokemon';
import { PokemonCard } from './PokemonCard';

export async function PopularPokemon() {
  const pokemon = await getPopularPokemon();

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-wide">
          POPULAR POKÉMON
        </h2>
        <Link
          href="/pokemon"
          className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          View all Pokémon →
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide md:justify-center">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  );
}
