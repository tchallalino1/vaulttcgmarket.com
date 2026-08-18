import Link from 'next/link';
import { getAllCategories } from '@/lib/categories';
import { CategoryCard } from './CategoryCard';

export async function ExploreByType() {
  const categories = await getAllCategories();

  return (
    <section className="bg-white rounded-2xl shadow-sm py-12 px-8">
      <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">
        EXPLORE BY TYPE
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
