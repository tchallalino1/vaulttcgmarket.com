// Categories data access - uses Prisma (Neon DB)
export {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/admin/db';
