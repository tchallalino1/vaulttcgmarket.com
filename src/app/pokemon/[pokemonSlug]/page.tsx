import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPokemonBySlug } from '@/lib/pokemon';
import { getProductsByPokemon } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export async function generateMetadata({ params }: { params: Promise<{ pokemonSlug: string }> }) {
  const { pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);
  if (!pokemon) return { title: 'Not Found' };
  return {
    title: `${pokemon.name} Cards — Vault TCG Market`,
    description: `Shop ${pokemon.name} Pokémon cards, graded cards, and sealed products.`,
  };
}

export default async function PokemonDetailPage({ params }: { params: Promise<{ pokemonSlug: string }> }) {
  const { pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);
  if (!pokemon) notFound();

  const products = await getProductsByPokemon(pokemon.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/pokemon" className="hover:text-purple-600">Pokémon</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{pokemon.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-purple-200 via-purple-100 to-fuchsia-200 flex items-center justify-center shadow-lg flex-shrink-0">
          <span className="text-5xl font-bold text-purple-700">{pokemon.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{pokemon.name}</h1>
          {pokemon.description && (
            <p className="text-gray-600 mb-2">{pokemon.description}</p>
          )}
          <p className="text-sm text-gray-500">{pokemon.cardCount} cards in database</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">{pokemon.name} Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found for {pokemon.name}.</p>
      )}
    </div>
  );
}
