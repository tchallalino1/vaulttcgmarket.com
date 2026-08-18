import { Category } from '@/types';

export const seedCategories: Category[] = [
  {
    id: 'cat-001',
    name: 'Singles',
    slug: 'singles',
    image: '/categories/singles.jpg',
    description: 'Individual cards from all sets and eras. Find the perfect card for your collection.',
    productCount: 12450,
  },
  {
    id: 'cat-002',
    name: 'Graded Cards',
    slug: 'graded',
    image: '/categories/graded.jpg',
    description: 'PSA, CGC, BGS & more. Certified and graded cards for serious collectors.',
    productCount: 3820,
  },
  {
    id: 'cat-003',
    name: 'Sealed Products',
    slug: 'sealed',
    image: '/categories/sealed.jpg',
    description: 'Booster boxes, ETBs & more. Factory sealed products for opening or investment.',
    productCount: 1560,
  },
  {
    id: 'cat-004',
    name: 'Vintage',
    slug: 'vintage',
    image: '/categories/vintage.jpg',
    description: 'Classic cards from Base Set to Neo era. Own a piece of Pokémon history.',
    productCount: 890,
  },
  {
    id: 'cat-005',
    name: 'Accessories',
    slug: 'accessories',
    image: '/categories/accessories.jpg',
    description: 'Protection & display supplies. Sleeves, binders, cases, and more.',
    productCount: 3420,
  },
];

export function getCategories(): Category[] {
  return seedCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return seedCategories.find(category => category.slug === slug);
}
