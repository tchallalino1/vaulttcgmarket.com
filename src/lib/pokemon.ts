// Pokemon data access - uses Prisma (Neon DB)
export {
  getAllPokemon,
  getPokemonById,
  getPokemonBySlug,
  getPopularPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from '@/lib/admin/db';
