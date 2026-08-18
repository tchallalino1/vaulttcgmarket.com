import { Product, ProductType } from '@/types';

export const seedProducts: Product[] = [
  // === RAW SINGLES ===
  {
    id: 'prod-001',
    name: 'Charizard VMAX',
    slug: 'charizard-vmax',
    description: 'The iconic Charizard VMAX from Shining Fates. A must-have for any serious collector.',
    productType: 'single',
    category: 'singles',
    price: 89.99,
    compareAtPrice: 99.99,
    currency: 'USD',
    stock: 12,
    images: ['/products/charizard-vmax.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Shining Fates',
    setSlug: 'shining-fates',
    cardNumber: 'SV010/SV122',
    rarity: 'Ultra Rare',
    pokemon: 'Charizard',
    pokemonSlug: 'charizard',
    priceChange: 5.2,
    priceChangePercent: 6.1,
    trending: true,
    pokemonTcgCardId: 'swsh9-215',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-10T14:22:00Z',
  },
  {
    id: 'prod-002',
    name: 'Umbreon VMAX',
    slug: 'umbreon-vmax',
    description: 'The highly sought-after Umbreon VMAX from Evolving Skies. One of the most popular modern cards.',
    productType: 'single',
    category: 'singles',
    price: 349.99,
    compareAtPrice: 375.00,
    currency: 'USD',
    stock: 3,
    images: ['/products/umbreon-vmax.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '215/203',
    rarity: 'Secret Rare',
    pokemon: 'Umbreon',
    pokemonSlug: 'umbreon',
    priceChange: 24.5,
    priceChangePercent: 7.5,
    featured: true,
    trending: true,
    pokemonTcgCardId: 'swsh8-215',
    createdAt: '2024-01-20T08:15:00Z',
    updatedAt: '2024-03-11T09:45:00Z',
  },
  {
    id: 'prod-003',
    name: 'Pikachu VMAX',
    slug: 'pikachu-vmax-37',
    description: 'Pikachu VMAX from Vivid Voltage. The face of the TCG in VMAX form.',
    productType: 'single',
    category: 'singles',
    price: 54.99,
    currency: 'USD',
    stock: 18,
    images: ['/products/pikachu-vmax-37.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Vivid Voltage',
    setSlug: 'vivid-voltage',
    cardNumber: '044/185',
    rarity: 'Ultra Rare',
    pokemon: 'Pikachu',
    pokemonSlug: 'pikachu',
    priceChange: 3.1,
    priceChangePercent: 6.0,
    pokemonTcgCardId: 'swsh4-044',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-03-09T16:30:00Z',
  },
  {
    id: 'prod-004',
    name: 'Gengar VMAX',
    slug: 'gengar-vmax',
    description: 'Gengar VMAX from Fusion Strike. A stunning ghost-type card.',
    productType: 'single',
    category: 'singles',
    price: 28.50,
    currency: 'USD',
    stock: 22,
    images: ['/products/gengar-vmax.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Fusion Strike',
    setSlug: 'fusion-strike',
    cardNumber: '157/264',
    rarity: 'Ultra Rare',
    pokemon: 'Gengar',
    pokemonSlug: 'gengar',
    priceChange: -1.5,
    priceChangePercent: -5.0,
    pokemonTcgCardId: 'swsh11-157',
    createdAt: '2024-01-25T14:20:00Z',
    updatedAt: '2024-03-08T11:10:00Z',
  },
  {
    id: 'prod-005',
    name: 'Mewtwo VSTAR',
    slug: 'mewtwo-vstar',
    description: 'Mewtwo VSTAR from Crown Zenith. A powerful psychic-type card with stunning artwork.',
    productType: 'single',
    category: 'singles',
    price: 22.99,
    currency: 'USD',
    stock: 35,
    images: ['/products/mewtwo-vstar.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Crown Zenith',
    setSlug: 'crown-zenith',
    cardNumber: '050/159',
    rarity: 'Ultra Rare',
    pokemon: 'Mewtwo',
    pokemonSlug: 'mewtwo',
    priceChange: 2.5,
    priceChangePercent: 12.2,
    trending: true,
    pokemonTcgCardId: 'swsh12-109',
    createdAt: '2024-02-10T09:45:00Z',
    updatedAt: '2024-03-11T08:20:00Z',
  },
  {
    id: 'prod-006',
    name: 'Rayquaza VMAX',
    slug: 'rayquaza-vmax-alt-art',
    description: 'The stunning alternate art Rayquaza VMAX from Evolving Skies. One of the most beautiful cards ever printed.',
    productType: 'single',
    category: 'singles',
    price: 275.00,
    compareAtPrice: 300.00,
    currency: 'USD',
    stock: 4,
    images: ['/products/rayquaza-vmax-alt-art.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '218/203',
    rarity: 'Secret Rare',
    pokemon: 'Rayquaza',
    pokemonSlug: 'rayquaza',
    priceChange: 15.0,
    priceChangePercent: 5.8,
    pokemonTcgCardId: 'swsh8-218',
    createdAt: '2024-01-18T16:00:00Z',
    updatedAt: '2024-03-10T13:15:00Z',
  },
  {
    id: 'prod-007',
    name: 'Eevee VMAX',
    slug: 'eevee-vmax',
    description: 'Eevee VMAX from Evolving Skies. The adorable evolution Pokémon in its VMAX form.',
    productType: 'single',
    category: 'singles',
    price: 18.99,
    currency: 'USD',
    stock: 28,
    images: ['/products/eevee-vmax.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '189/203',
    rarity: 'Ultra Rare',
    pokemon: 'Eevee',
    pokemonSlug: 'eevee',
    priceChange: 1.2,
    priceChangePercent: 6.7,
    pokemonTcgCardId: 'swsh8-189',
    createdAt: '2024-02-05T10:30:00Z',
    updatedAt: '2024-03-09T15:40:00Z',
  },
  {
    id: 'prod-008',
    name: 'Dragonite VSTAR',
    slug: 'dragonite-vstar',
    description: 'Dragonite VSTAR from Silver Tempest. A majestic dragon-type card.',
    productType: 'single',
    category: 'singles',
    price: 15.50,
    currency: 'USD',
    stock: 42,
    images: ['/products/dragonite-vstar.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Silver Tempest',
    setSlug: 'silver-tempest',
    cardNumber: '071/195',
    rarity: 'Ultra Rare',
    pokemon: 'Dragonite',
    pokemonSlug: 'dragonite',
    priceChange: -0.5,
    priceChangePercent: -3.1,
    pokemonTcgCardId: 'swsh10-113',
    createdAt: '2024-02-12T11:00:00Z',
    updatedAt: '2024-03-08T14:25:00Z',
  },
  {
    id: 'prod-009',
    name: 'Charizard ex',
    slug: 'charizard-ex-228',
    description: 'Charizard ex from Pokémon 151. The classic starter in its ex form from the beloved 151 set.',
    productType: 'single',
    category: 'singles',
    price: 32.99,
    currency: 'USD',
    stock: 20,
    images: ['/products/charizard-ex-228.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Pokémon 151',
    setSlug: 'pokemon-151',
    cardNumber: '228/165',
    rarity: 'Ultra Rare',
    pokemon: 'Charizard',
    pokemonSlug: 'charizard',
    priceChange: 4.5,
    priceChangePercent: 15.8,
    trending: true,
    pokemonTcgCardId: 'sv3pt5-228',
    createdAt: '2024-02-15T09:20:00Z',
    updatedAt: '2024-03-11T10:05:00Z',
  },
  {
    id: 'prod-010',
    name: 'Pikachu Illustration Rare',
    slug: 'pikachu-illustration-rare',
    description: 'Pikachu Illustration Rare from Pokémon 151. A beautiful full-art illustration of the beloved electric mouse.',
    productType: 'single',
    category: 'singles',
    price: 12.99,
    currency: 'USD',
    stock: 55,
    images: ['/products/pikachu-illustration-rare.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Pokémon 151',
    setSlug: 'pokemon-151',
    cardNumber: '172/165',
    rarity: 'Illustration Rare',
    pokemon: 'Pikachu',
    pokemonSlug: 'pikachu',
    priceChange: 1.8,
    priceChangePercent: 16.1,
    pokemonTcgCardId: 'sv3pt5-174',
    createdAt: '2024-02-18T13:40:00Z',
    updatedAt: '2024-03-10T17:30:00Z',
  },
  {
    id: 'prod-011',
    name: 'Umbreon V',
    slug: 'umbreon-v',
    description: 'Umbreon V from Evolving Skies. A sleek dark-type card featuring the beloved Moonlight Pokémon.',
    productType: 'single',
    category: 'singles',
    price: 8.50,
    currency: 'USD',
    stock: 45,
    images: ['/products/umbreon-v.jpg'],
    condition: 'Lightly Played',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '095/203',
    rarity: 'Ultra Rare',
    pokemon: 'Umbreon',
    pokemonSlug: 'umbreon',
    priceChange: 0.5,
    priceChangePercent: 6.3,
    pokemonTcgCardId: 'swsh8-094',
    createdAt: '2024-02-20T08:50:00Z',
    updatedAt: '2024-03-09T12:10:00Z',
  },
  {
    id: 'prod-012',
    name: 'Mewtwo Special Illustration Rare',
    slug: 'mewtwo-special-illustration-rare',
    description: 'Mewtwo Special Illustration Rare from Pokémon 151. An incredible full-art card.',
    productType: 'single',
    category: 'singles',
    price: 68.00,
    compareAtPrice: 75.00,
    currency: 'USD',
    stock: 8,
    images: ['/products/mewtwo-special-illustration-rare.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Pokémon 151',
    setSlug: 'pokemon-151',
    cardNumber: '203/165',
    rarity: 'Special Illustration Rare',
    pokemon: 'Mewtwo',
    pokemonSlug: 'mewtwo',
    priceChange: 7.0,
    priceChangePercent: 11.5,
    pokemonTcgCardId: 'sv3pt5-203',
    createdAt: '2024-02-22T10:15:00Z',
    updatedAt: '2024-03-11T07:45:00Z',
  },

  // === PSA GRADED CARDS ===
  {
    id: 'prod-013',
    name: 'PSA 10 Charizard VMAX',
    slug: 'psa-10-charizard-vmax',
    description: 'Perfect PSA 10 Gem Mint Charizard VMAX from Shining Fates. Invest in the best.',
    productType: 'graded',
    category: 'graded',
    price: 325.00,
    compareAtPrice: 350.00,
    currency: 'USD',
    stock: 2,
    images: ['/products/psa-10-charizard-vmax.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Shining Fates',
    setSlug: 'shining-fates',
    cardNumber: 'SV010/SV122',
    rarity: 'Ultra Rare',
    pokemon: 'Charizard',
    pokemonSlug: 'charizard',
    gradingCompany: 'PSA',
    grade: '10',
    certificationNumber: 'PSA-59823104',
    priceChange: 25.0,
    priceChangePercent: 8.3,
    trending: true,
    pokemonTcgCardId: 'swsh9-215',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-03-11T11:30:00Z',
  },
  {
    id: 'prod-014',
    name: 'PSA 10 Umbreon VMAX',
    slug: 'psa-10-umbreon-vmax',
    description: 'Flawless PSA 10 Umbreon VMAX alternate art. One of the most valuable modern cards.',
    productType: 'graded',
    category: 'graded',
    price: 2800.00,
    currency: 'USD',
    stock: 1,
    images: ['/products/psa-10-umbreon-vmax.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '215/203',
    rarity: 'Secret Rare',
    pokemon: 'Umbreon',
    pokemonSlug: 'umbreon',
    gradingCompany: 'PSA',
    grade: '10',
    certificationNumber: 'PSA-61024587',
    priceChange: 150.0,
    priceChangePercent: 5.7,
    featured: true,
    trending: true,
    pokemonTcgCardId: 'swsh8-215',
    createdAt: '2024-01-05T14:30:00Z',
    updatedAt: '2024-03-11T10:00:00Z',
  },
  {
    id: 'prod-015',
    name: 'PSA 9 Pikachu VMAX',
    slug: 'psa-9-pikachu-vmax',
    description: 'PSA 9 MINT Pikachu VMAX. Excellent condition with strong eye appeal.',
    productType: 'graded',
    category: 'graded',
    price: 125.00,
    currency: 'USD',
    stock: 5,
    images: ['/products/psa-9-pikachu-vmax.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Vivid Voltage',
    setSlug: 'vivid-voltage',
    cardNumber: '044/185',
    rarity: 'Ultra Rare',
    pokemon: 'Pikachu',
    pokemonSlug: 'pikachu',
    gradingCompany: 'PSA',
    grade: '9',
    certificationNumber: 'PSA-58213794',
    priceChange: 8.5,
    priceChangePercent: 7.3,
    pokemonTcgCardId: 'swsh4-044',
    createdAt: '2024-01-22T11:45:00Z',
    updatedAt: '2024-03-10T08:55:00Z',
  },
  {
    id: 'prod-016',
    name: 'PSA 10 Mewtwo VSTAR',
    slug: 'psa-10-mewtwo-vstar',
    description: 'PSA 10 Gem Mint Mewtwo VSTAR from Crown Zenith. Perfect condition guaranteed.',
    productType: 'graded',
    category: 'graded',
    price: 95.00,
    currency: 'USD',
    stock: 8,
    images: ['/products/psa-10-mewtwo-vstar.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Crown Zenith',
    setSlug: 'crown-zenith',
    cardNumber: '050/159',
    rarity: 'Ultra Rare',
    pokemon: 'Mewtwo',
    pokemonSlug: 'mewtwo',
    gradingCompany: 'PSA',
    grade: '10',
    certificationNumber: 'PSA-60142856',
    priceChange: 10.0,
    priceChangePercent: 11.8,
    trending: true,
    pokemonTcgCardId: 'swsh12-109',
    createdAt: '2024-02-08T13:20:00Z',
    updatedAt: '2024-03-11T09:15:00Z',
  },
  {
    id: 'prod-017',
    name: 'PSA 10 Rayquaza VMAX',
    slug: 'psa-10-rayquaza-vmax-alt-art',
    description: 'The crown jewel - PSA 10 alternate art Rayquaza VMAX. A true grail card.',
    productType: 'graded',
    category: 'graded',
    price: 1850.00,
    currency: 'USD',
    stock: 1,
    images: ['/products/psa-10-rayquaza-vmax-alt-art.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '218/203',
    rarity: 'Secret Rare',
    pokemon: 'Rayquaza',
    pokemonSlug: 'rayquaza',
    gradingCompany: 'PSA',
    grade: '10',
    certificationNumber: 'PSA-59341278',
    priceChange: 100.0,
    priceChangePercent: 5.7,
    pokemonTcgCardId: 'swsh8-218',
    createdAt: '2024-01-08T16:10:00Z',
    updatedAt: '2024-03-10T15:40:00Z',
  },
  {
    id: 'prod-018',
    name: 'PSA 8 Charizard Base Set',
    slug: 'psa-8-charizard-base-set',
    description: 'PSA 8 NM-MT 1st Edition Charizard from Base Set. An iconic vintage card.',
    productType: 'graded',
    category: 'graded',
    price: 1250.00,
    compareAtPrice: 1350.00,
    currency: 'USD',
    stock: 1,
    images: ['/products/psa-8-charizard-base-set.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Base Set',
    setSlug: 'base-set',
    cardNumber: '4/102',
    rarity: 'Rare Holo',
    pokemon: 'Charizard',
    pokemonSlug: 'charizard',
    gradingCompany: 'PSA',
    grade: '8',
    certificationNumber: 'PSA-12456789',
    priceChange: -50.0,
    priceChangePercent: -3.8,
    pokemonTcgCardId: 'base1-4',
    createdAt: '2024-01-02T08:00:00Z',
    updatedAt: '2024-03-09T10:20:00Z',
  },

  // === CGC GRADED CARDS ===
  {
    id: 'prod-019',
    name: 'CGC 9.5 Umbreon VMAX',
    slug: 'cgc-95-umbreon-vmax',
    description: 'CGC 9.5 Gem Mint Umbreon VMAX. Near-perfect grading from a trusted company.',
    productType: 'graded',
    category: 'graded',
    price: 450.00,
    currency: 'USD',
    stock: 3,
    images: ['/products/cgc-95-umbreon-vmax.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '215/203',
    rarity: 'Secret Rare',
    pokemon: 'Umbreon',
    pokemonSlug: 'umbreon',
    gradingCompany: 'CGC',
    grade: '9.5',
    certificationNumber: 'CGC-412856734',
    priceChange: 30.0,
    priceChangePercent: 7.1,
    pokemonTcgCardId: 'swsh8-215',
    createdAt: '2024-01-12T10:30:00Z',
    updatedAt: '2024-03-10T12:45:00Z',
  },
  {
    id: 'prod-020',
    name: 'CGC 10 Charizard ex',
    slug: 'cgc-10-charizard-ex',
    description: 'Perfect CGC 10 Pristine Charizard ex from Pokémon 151. Flawless card.',
    productType: 'graded',
    category: 'graded',
    price: 185.00,
    currency: 'USD',
    stock: 4,
    images: ['/products/cgc-10-charizard-ex.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Pokémon 151',
    setSlug: 'pokemon-151',
    cardNumber: '228/165',
    rarity: 'Ultra Rare',
    pokemon: 'Charizard',
    pokemonSlug: 'charizard',
    gradingCompany: 'CGC',
    grade: '10',
    certificationNumber: 'CGC-415923847',
    priceChange: 20.0,
    priceChangePercent: 12.1,
    trending: true,
    pokemonTcgCardId: 'sv3pt5-228',
    createdAt: '2024-02-14T15:00:00Z',
    updatedAt: '2024-03-11T08:30:00Z',
  },
  {
    id: 'prod-021',
    name: 'CGC 9 Rayquaza VMAX',
    slug: 'cgc-9-rayquaza-vmax',
    description: 'CGC 9 MINT Rayquaza VMAX alternate art. Strong eye appeal at a great price.',
    productType: 'graded',
    category: 'graded',
    price: 320.00,
    currency: 'USD',
    stock: 2,
    images: ['/products/cgc-9-rayquaza-vmax.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    cardNumber: '218/203',
    rarity: 'Secret Rare',
    pokemon: 'Rayquaza',
    pokemonSlug: 'rayquaza',
    gradingCompany: 'CGC',
    grade: '9',
    certificationNumber: 'CGC-413847291',
    priceChange: 15.0,
    priceChangePercent: 4.9,
    pokemonTcgCardId: 'swsh8-218',
    createdAt: '2024-01-28T09:15:00Z',
    updatedAt: '2024-03-09T14:50:00Z',
  },

  // === BGS GRADED CARDS ===
  {
    id: 'prod-022',
    name: 'BGS 9.5 Charizard VMAX',
    slug: 'bgs-95-charizard-vmax',
    description: 'Beckett 9.5 Gem Mint Charizard VMAX. Gold label quality.',
    productType: 'graded',
    category: 'graded',
    price: 285.00,
    currency: 'USD',
    stock: 2,
    images: ['/products/bgs-95-charizard-vmax.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Shining Fates',
    setSlug: 'shining-fates',
    cardNumber: 'SV010/SV122',
    rarity: 'Ultra Rare',
    pokemon: 'Charizard',
    pokemonSlug: 'charizard',
    gradingCompany: 'BGS',
    grade: '9.5',
    certificationNumber: 'BGS-78452193',
    priceChange: 18.0,
    priceChangePercent: 6.7,
    pokemonTcgCardId: 'swsh9-215',
    createdAt: '2024-02-02T11:30:00Z',
    updatedAt: '2024-03-10T10:10:00Z',
  },

  // === SEALED PRODUCTS ===
  {
    id: 'prod-023',
    name: 'Evolving Skies Booster Box',
    slug: 'evolving-skies-booster-box',
    description: 'Factory sealed Evolving Skies booster box. 36 packs featuring Umbreon and Rayquaza.',
    productType: 'sealed',
    category: 'sealed',
    price: 425.00,
    compareAtPrice: 450.00,
    currency: 'USD',
    stock: 8,
    images: ['/products/evolving-skies-booster-box.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Evolving Skies',
    setSlug: 'evolving-skies',
    priceChange: 25.0,
    priceChangePercent: 6.3,
    trending: true,
    pokemonTcgCardId: 'swsh8-215',
    createdAt: '2024-01-03T08:45:00Z',
    updatedAt: '2024-03-11T07:30:00Z',
  },
  {
    id: 'prod-024',
    name: 'Pokémon 151 Booster Bundle',
    slug: 'pokemon-151-booster-bundle',
    description: 'Pokémon 151 Booster Bundle with 6 booster packs. The classic Kanto experience.',
    productType: 'sealed',
    category: 'sealed',
    price: 42.99,
    currency: 'USD',
    stock: 25,
    images: ['/products/pokemon-151-booster-bundle.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Pokémon 151',
    setSlug: 'pokemon-151',
    priceChange: 3.0,
    priceChangePercent: 7.5,
    pokemonTcgCardId: 'sv3pt5-228',
    createdAt: '2024-02-08T12:00:00Z',
    updatedAt: '2024-03-10T09:20:00Z',
  },
  {
    id: 'prod-025',
    name: 'Crown Zenith Elite Trainer Box',
    slug: 'crown-zenith-etb',
    description: 'Crown Zenith ETB with 9 booster packs, card sleeves, and more. Premium sealed product.',
    productType: 'sealed',
    category: 'sealed',
    price: 52.50,
    compareAtPrice: 59.99,
    currency: 'USD',
    stock: 15,
    images: ['/products/crown-zenith-etb.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Crown Zenith',
    setSlug: 'crown-zenith',
    priceChange: 2.5,
    priceChangePercent: 5.0,
    pokemonTcgCardId: 'swsh12-109',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-03-09T11:40:00Z',
  },
  {
    id: 'prod-026',
    name: 'Lost Origin Booster Box',
    slug: 'lost-origin-booster-box',
    description: 'Factory sealed Lost Origin booster box. 36 packs with Giratina VSTAR.',
    productType: 'sealed',
    category: 'sealed',
    price: 98.00,
    currency: 'USD',
    stock: 12,
    images: ['/products/lost-origin-booster-box.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Lost Origin',
    setSlug: 'lost-origin',
    priceChange: 5.0,
    priceChangePercent: 5.4,
    pokemonTcgCardId: 'swsh11-157',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-08T13:25:00Z',
  },
  {
    id: 'prod-027',
    name: 'Silver Tempest Booster Box',
    slug: 'silver-tempest-booster-box',
    description: 'Factory sealed Silver Tempest booster box. 36 packs featuring Lugia VSTAR.',
    productType: 'sealed',
    category: 'sealed',
    price: 95.00,
    currency: 'USD',
    stock: 10,
    images: ['/products/silver-tempest-booster-box.jpg'],
    condition: 'Factory Sealed',
    language: 'English',
    set: 'Silver Tempest',
    setSlug: 'silver-tempest',
    priceChange: 3.5,
    priceChangePercent: 3.8,
    pokemonTcgCardId: 'swsh10-113',
    createdAt: '2024-01-28T09:15:00Z',
    updatedAt: '2024-03-09T08:50:00Z',
  },
  {
    id: 'prod-028',
    name: 'Japanese 151 Booster Box',
    slug: 'japanese-151-booster-box',
    description: 'Japanese Pokémon 151 booster box. 20 packs of Japanese cards featuring Kanto Pokémon.',
    productType: 'sealed',
    category: 'sealed',
    price: 65.00,
    compareAtPrice: 72.00,
    currency: 'USD',
    stock: 18,
    images: ['/products/japanese-151-booster-box.jpg'],
    condition: 'Factory Sealed',
    language: 'Japanese',
    set: '151 Japanese',
    setSlug: '151-japanese',
    priceChange: 4.0,
    priceChangePercent: 6.6,
    pokemonTcgCardId: 'sv3pt5-228',
    createdAt: '2024-02-10T11:30:00Z',
    updatedAt: '2024-03-10T14:15:00Z',
  },

  // === VINTAGE CARDS ===
  {
    id: 'prod-029',
    name: '1st Edition Holo Charizard',
    slug: '1st-edition-holo-charizard',
    description: 'The holy grail. 1st Edition Base Set Holo Charizard. Raw, ungraded condition.',
    productType: 'vintage',
    category: 'vintage',
    price: 3500.00,
    currency: 'USD',
    stock: 1,
    images: ['/products/1st-edition-holo-charizard.jpg'],
    condition: 'Lightly Played',
    language: 'English',
    set: 'Base Set',
    setSlug: 'base-set',
    cardNumber: '4/102',
    rarity: 'Rare Holo',
    pokemon: 'Charizard',
    pokemonSlug: 'charizard',
    priceChange: 200.0,
    priceChangePercent: 6.1,
    featured: true,
    trending: true,
    pokemonTcgCardId: 'base1-4',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-11T12:00:00Z',
  },
  {
    id: 'prod-030',
    name: 'Base Set Pikachu',
    slug: 'base-set-pikachu',
    description: 'Original Base Set Pikachu. A nostalgic piece of Pokémon history.',
    productType: 'vintage',
    category: 'vintage',
    price: 85.00,
    compareAtPrice: 95.00,
    currency: 'USD',
    stock: 6,
    images: ['/products/base-set-pikachu.jpg'],
    condition: 'Moderately Played',
    language: 'English',
    set: 'Base Set',
    setSlug: 'base-set',
    cardNumber: '58/102',
    rarity: 'Common',
    pokemon: 'Pikachu',
    pokemonSlug: 'pikachu',
    priceChange: 5.0,
    priceChangePercent: 6.3,
    pokemonTcgCardId: 'base1-58',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-03-09T16:10:00Z',
  },
  {
    id: 'prod-031',
    name: 'Neo Genesis Lugia',
    slug: 'neo-genesis-lugia',
    description: 'Neo Genesis Lugia Holo. One of the most iconic cards from the Neo era.',
    productType: 'vintage',
    category: 'vintage',
    price: 285.00,
    currency: 'USD',
    stock: 2,
    images: ['/products/neo-genesis-lugia.jpg'],
    condition: 'Near Mint',
    language: 'English',
    set: 'Neo Genesis',
    setSlug: 'neo-genesis',
    cardNumber: '08/111',
    rarity: 'Rare Holo',
    pokemon: 'Lugia',
    pokemonSlug: 'lugia',
    priceChange: 15.0,
    priceChangePercent: 5.6,
    pokemonTcgCardId: 'neo2-27',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-03-10T08:25:00Z',
  },
  {
    id: 'prod-032',
    name: 'Fossil Mewtwo',
    slug: 'fossil-mewtwo',
    description: 'Fossil set Mewtwo. A classic vintage card from the early days of TCG.',
    productType: 'vintage',
    category: 'vintage',
    price: 42.50,
    currency: 'USD',
    stock: 8,
    images: ['/products/fossil-mewtwo.jpg'],
    condition: 'Lightly Played',
    language: 'English',
    set: 'Fossil',
    setSlug: 'fossil',
    cardNumber: '10/62',
    rarity: 'Rare Holo',
    pokemon: 'Mewtwo',
    pokemonSlug: 'mewtwo',
    priceChange: 2.5,
    priceChangePercent: 6.3,
    pokemonTcgCardId: 'fossil-10',
    createdAt: '2024-02-05T14:45:00Z',
    updatedAt: '2024-03-09T09:30:00Z',
  },

  // === ACCESSORIES ===
  {
    id: 'prod-033',
    name: 'Premium Card Sleeves - Charizard',
    slug: 'premium-card-sleeves-charizard',
    description: '100 premium Charizard-themed card sleeves. Ultra-clear, acid-free protection.',
    productType: 'accessory',
    category: 'accessories',
    price: 8.99,
    currency: 'USD',
    stock: 200,
    images: ['/products/premium-card-sleeves-charizard.jpg'],
    priceChange: 0.5,
    priceChangePercent: 5.9,
    pokemonTcgCardId: undefined,
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-03-10T11:00:00Z',
  },
  {
    id: 'prod-034',
    name: 'Elite Card Binder - 9 Pocket',
    slug: 'elite-card-binder-9-pocket',
    description: 'Premium 9-pocket card binder. Holds up to 360 cards with protective pages.',
    productType: 'accessory',
    category: 'accessories',
    price: 24.99,
    compareAtPrice: 29.99,
    currency: 'USD',
    stock: 75,
    images: ['/products/elite-card-binder-9-pocket.jpg'],
    priceChange: 2.0,
    priceChangePercent: 8.7,
    pokemonTcgCardId: undefined,
    createdAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-03-09T14:20:00Z',
  },
  {
    id: 'prod-035',
    name: 'Toploader Storage Box',
    slug: 'toploader-storage-box',
    description: 'Sturdy storage box for toploaded cards. Holds up to 200 toploaded cards safely.',
    productType: 'accessory',
    category: 'accessories',
    price: 15.99,
    currency: 'USD',
    stock: 120,
    images: ['/products/toploader-storage-box.jpg'],
    pokemonTcgCardId: undefined,
    createdAt: '2024-02-12T09:15:00Z',
    updatedAt: '2024-03-08T10:45:00Z',
  },
  {
    id: 'prod-036',
    name: 'Graded Card Display Case',
    slug: 'graded-card-display-case',
    description: 'UV-protected display case for graded cards. Fits PSA, CGC, and BGS slabs.',
    productType: 'accessory',
    category: 'accessories',
    price: 19.99,
    currency: 'USD',
    stock: 60,
    images: ['/products/graded-card-display-case.jpg'],
    priceChange: 1.0,
    priceChangePercent: 5.3,
    pokemonTcgCardId: undefined,
    createdAt: '2024-02-18T12:00:00Z',
    updatedAt: '2024-03-10T15:30:00Z',
  },
];

export function getTrendingProducts(): Product[] {
  return seedProducts.filter(product => product.trending === true);
}

export function getFeaturedProduct(): Product | undefined {
  return seedProducts.find(product => product.featured === true);
}

export function getProductBySlug(slug: string): Product | undefined {
  return seedProducts.find(product => product.slug === slug);
}

export function getProductsByType(type: ProductType): Product[] {
  return seedProducts.filter(product => product.productType === type);
}

export function getProductsByPokemon(pokemonName: string): Product[] {
  return seedProducts.filter(product => product.pokemon === pokemonName);
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.toLowerCase().trim();
  return seedProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      (product.pokemon && product.pokemon.toLowerCase().includes(normalizedQuery)) ||
      (product.set && product.set.toLowerCase().includes(normalizedQuery)) ||
      (product.cardNumber && product.cardNumber.toLowerCase().includes(normalizedQuery)) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function getProductsBySet(setSlug: string): Product[] {
  return seedProducts.filter(p => p.setSlug === setSlug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'singles') return seedProducts.filter(p => p.productType === 'single');
  if (categorySlug === 'graded') return seedProducts.filter(p => p.productType === 'graded');
  if (categorySlug === 'sealed') return seedProducts.filter(p => p.productType === 'sealed');
  if (categorySlug === 'vintage') return seedProducts.filter(p => p.productType === 'vintage');
  if (categorySlug === 'accessories') return seedProducts.filter(p => p.productType === 'accessory');
  return [];
}

export function getDeals(): Product[] {
  return seedProducts.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
}

export function getGradedProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'graded');
}

export function getSealedProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'sealed');
}

export function getVintageProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'vintage');
}

export function getAccessoryProducts(): Product[] {
  return seedProducts.filter(p => p.productType === 'accessory');
}

export function getProductsByRarity(rarity: string): Product[] {
  return seedProducts.filter(p => p.rarity === rarity);
}

export function getProductsByGrade(gradingCompany: string, grade?: string): Product[] {
  return seedProducts.filter(p => {
    if (p.gradingCompany !== gradingCompany) return false;
    if (grade && p.grade !== grade) return false;
    return true;
  });
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return seedProducts
    .filter(p => p.id !== product.id && (
      p.pokemon === product.pokemon ||
      p.set === product.set ||
      p.productType === product.productType
    ))
    .slice(0, limit);
}

export function getAllProducts(): Product[] {
  return seedProducts;
}

export function getFilteredProducts(filters: {
  pokemon?: string;
  set?: string;
  productType?: string;
  condition?: string;
  gradingCompany?: string;
  grade?: string;
  rarity?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
}): Product[] {
  let results = [...seedProducts];

  if (filters.pokemon) {
    results = results.filter(p => p.pokemon?.toLowerCase() === filters.pokemon!.toLowerCase());
  }
  if (filters.set) {
    results = results.filter(p => p.setSlug === filters.set);
  }
  if (filters.productType) {
    results = results.filter(p => p.productType === filters.productType);
  }
  if (filters.condition) {
    results = results.filter(p => p.condition === filters.condition);
  }
  if (filters.gradingCompany) {
    results = results.filter(p => p.gradingCompany === filters.gradingCompany);
  }
  if (filters.grade) {
    results = results.filter(p => p.grade === filters.grade);
  }
  if (filters.rarity) {
    results = results.filter(p => p.rarity === filters.rarity);
  }
  if (filters.language) {
    results = results.filter(p => p.language === filters.language);
  }
  if (filters.minPrice != null) {
    results = results.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    results = results.filter(p => p.price <= filters.maxPrice!);
  }
  if (filters.inStock) {
    results = results.filter(p => p.stock > 0);
  }

  // Sorting
  switch (filters.sort) {
    case 'price_asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'popular':
      results.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
      break;
    case 'trending':
      results.sort((a, b) => (b.priceChangePercent || 0) - (a.priceChangePercent || 0));
      break;
    default:
      break;
  }

  return results;
}
