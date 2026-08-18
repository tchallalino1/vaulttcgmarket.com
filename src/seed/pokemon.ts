import { Pokemon } from '@/types';

export const seedPokemon: Pokemon[] = [
  {
    id: 'pokemon-001',
    name: 'Charizard',
    slug: 'charizard',
    image: '/pokemon/charizard.png',
    description: 'The iconic fire-type Pokémon. One of the most popular and valuable Pokémon in the TCG.',
    cardCount: 847,
    pokemonTcgCardId: 'base1-4',
    popular: true,
  },
  {
    id: 'pokemon-002',
    name: 'Pikachu',
    slug: 'pikachu',
    image: '/pokemon/pikachu.png',
    description: 'The face of Pokémon. An electric-type mouse beloved by trainers worldwide.',
    cardCount: 923,
    pokemonTcgCardId: 'swsh4-044',
    popular: true,
  },
  {
    id: 'pokemon-003',
    name: 'Umbreon',
    slug: 'umbreon',
    image: '/pokemon/umbreon.png',
    description: 'The Moonlight Pokémon. A sleek dark-type Eeveelution with a devoted fanbase.',
    cardCount: 312,
    pokemonTcgCardId: 'swsh8-215',
    popular: true,
  },
  {
    id: 'pokemon-004',
    name: 'Gengar',
    slug: 'gengar',
    image: '/pokemon/gengar.png',
    description: 'The Shadow Pokémon. A mischievous ghost-poison type with an iconic grin.',
    cardCount: 428,
    pokemonTcgCardId: 'swsh11-157',
    popular: true,
  },
  {
    id: 'pokemon-005',
    name: 'Mewtwo',
    slug: 'mewtwo',
    image: '/pokemon/mewtwo.png',
    description: 'The Genetic Pokémon. A legendary psychic type created through genetic engineering.',
    cardCount: 389,
    pokemonTcgCardId: 'base1-10',
    popular: true,
  },
  {
    id: 'pokemon-006',
    name: 'Rayquaza',
    slug: 'rayquaza',
    image: '/pokemon/rayquaza.png',
    description: 'The Sky High Pokémon. A legendary dragon-flying type that reigns over the sky.',
    cardCount: 276,
    pokemonTcgCardId: 'swsh8-218',
    popular: true,
  },
  {
    id: 'pokemon-007',
    name: 'Eevee',
    slug: 'eevee',
    image: '/pokemon/eevee.png',
    description: 'The Evolution Pokémon. A normal-type with the unique ability to evolve into multiple forms.',
    cardCount: 512,
    pokemonTcgCardId: 'swsh8-189',
    popular: true,
  },
  {
    id: 'pokemon-008',
    name: 'Dragonite',
    slug: 'dragonite',
    image: '/pokemon/dragonite.png',
    description: 'The Dragon Pokémon. A powerful dragon-flying type with a gentle heart.',
    cardCount: 356,
    pokemonTcgCardId: 'swsh10-113',
    popular: true,
  },
];

export function getPopularPokemon(): Pokemon[] {
  return seedPokemon.filter(pokemon => pokemon.popular === true);
}

export function getPokemonBySlug(slug: string): Pokemon | undefined {
  return seedPokemon.find(pokemon => pokemon.slug === slug);
}
