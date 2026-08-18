// Sets data access - uses Prisma (Neon DB)
export {
  getAllSets,
  getSetById,
  getSetBySlug,
  createSet,
  updateSet,
  deleteSet,
} from '@/lib/admin/db';
