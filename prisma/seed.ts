import { PrismaClient } from '@prisma/client';
import { seedProducts } from '../src/seed/products';
import { seedPokemon } from '../src/seed/pokemon';
import { seedSets } from '../src/seed/sets';
import { seedCategories } from '../src/seed/categories';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Categories
  for (const cat of seedCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        description: cat.description,
        productCount: cat.productCount,
      },
    });
  }
  console.log(`Seeded ${seedCategories.length} categories`);

  // Seed Pokemon
  for (const p of seedPokemon) {
    await prisma.pokemon.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: p.image,
        description: p.description || '',
        cardCount: p.cardCount,
        pokemonTcgCardId: p.pokemonTcgCardId,
        popular: p.popular || false,
      },
    });
  }
  console.log(`Seeded ${seedPokemon.length} pokemon`);

  // Seed Sets
  for (const s of seedSets) {
    await prisma.set.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        id: s.id,
        name: s.name,
        slug: s.slug,
        logo: s.logo,
        image: s.image,
        releaseDate: s.releaseDate,
        totalCards: s.totalCards,
        series: s.series,
      },
    });
  }
  console.log(`Seeded ${seedSets.length} sets`);

  // Seed default seller
  await prisma.seller.upsert({
    where: { slug: 'vault-tcg-market' },
    update: {},
    create: {
      id: 'seller-001',
      name: 'Vault TCG Market',
      slug: 'vault-tcg-market',
      rating: 5.0,
      reviewCount: 0,
      verified: true,
    },
  });
  console.log('Seeded default seller');

  // Seed Products
  for (const p of seedProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        productType: p.productType,
        category: p.category,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        currency: p.currency,
        stock: p.stock,
        images: p.images,
        condition: p.condition,
        language: p.language,
        set: p.set,
        setSlug: p.setSlug,
        cardNumber: p.cardNumber,
        rarity: p.rarity,
        pokemon: p.pokemon,
        pokemonSlug: p.pokemonSlug,
        gradingCompany: p.gradingCompany,
        grade: p.grade,
        certificationNumber: p.certificationNumber,
        pokemonTcgCardId: p.pokemonTcgCardId,
        priceChange: p.priceChange,
        priceChangePercent: p.priceChangePercent,
        featured: p.featured || false,
        trending: p.trending || false,
      },
    });
  }
  console.log(`Seeded ${seedProducts.length} products`);

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
