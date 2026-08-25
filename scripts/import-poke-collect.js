const https = require('https');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'products', 'poke-collect');

// All products from poke-collect.com with proper classification
const allProducts = [
  // === SEALED: MEGA EVOLUTION DELTA REIGN ===
  {
    id: 'pcs-001', name: 'Mega Evolution: Delta Reign Booster Box', slug: 'mega-evolution-delta-reign-booster-box',
    description: 'Factory sealed Mega Evolution: Delta Reign Booster Box. 36 packs per box.',
    productType: 'sealed', category: 'sealed', price: 249.95, stock: 10,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/DRNBB_360x504.png?v=1787606560'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Delta Reign', setSlug: 'mega-evolution-delta-reign',
  },
  {
    id: 'pcs-002', name: 'Mega Evolution: Delta Reign Elite Trainer Box', slug: 'mega-evolution-delta-reign-elite-trainer-box',
    description: 'Factory sealed Mega Evolution: Delta Reign Elite Trainer Box. Includes 9 booster packs, sleeves, and more.',
    productType: 'sealed', category: 'sealed', price: 119.95, stock: 15,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/DRNETB_360x504.png?v=1787606600'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Delta Reign', setSlug: 'mega-evolution-delta-reign',
  },
  {
    id: 'pcs-003', name: 'Mega Evolution: Delta Reign Booster Bundle', slug: 'mega-evolution-delta-reign-booster-bundle',
    description: 'Factory sealed Mega Evolution: Delta Reign Booster Bundle. 6 booster packs.',
    productType: 'sealed', category: 'sealed', price: 49.95, stock: 20,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/DRNBUN_360x504.png?v=1787606646'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Delta Reign', setSlug: 'mega-evolution-delta-reign',
  },
  {
    id: 'pcs-004', name: 'Mega Evolution: Delta Reign 3-Pack Blister', slug: 'mega-evolution-delta-reign-3-pack-blister',
    description: 'Factory sealed Mega Evolution: Delta Reign 3-Pack Blister. 3 booster packs with promo card.',
    productType: 'sealed', category: 'sealed', price: 24.95, stock: 25,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/DRN3PK_360x504.png?v=1787606690'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Delta Reign', setSlug: 'mega-evolution-delta-reign',
  },
  {
    id: 'pcs-005', name: 'Mega Evolution: Delta Reign Single Pack Blister', slug: 'mega-evolution-delta-reign-single-pack-blister',
    description: 'Factory sealed Mega Evolution: Delta Reign Single Pack Blister. 1 booster pack with promo card.',
    productType: 'sealed', category: 'sealed', price: 8.49, stock: 30,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/DRN1PK_360x504.png?v=1787606736'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Delta Reign', setSlug: 'mega-evolution-delta-reign',
  },
  {
    id: 'pcs-006', name: 'Mega Evolution: Delta Reign Booster Pack', slug: 'mega-evolution-delta-reign-booster-pack',
    description: 'Single Mega Evolution: Delta Reign Booster Pack. 10 cards per pack.',
    productType: 'sealed', category: 'sealed', price: 7.95, stock: 50,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/DRNBP_360x504.png?v=1787606781'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Delta Reign', setSlug: 'mega-evolution-delta-reign',
  },

  // === SEALED: MEGA EVOLUTION PITCH BLACK ===
  {
    id: 'pcs-007', name: 'Mega Evolution: Pitch Black Booster Box', slug: 'mega-evolution-pitch-black-booster-box',
    description: 'Factory sealed Mega Evolution: Pitch Black Booster Box. 36 packs per box.',
    productType: 'sealed', category: 'sealed', price: 187.95, compareAtPrice: 199.95, stock: 12,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pb_bb_ad_360x504.png?v=1783632716'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Pitch Black', setSlug: 'mega-evolution-pitch-black',
  },
  {
    id: 'pcs-008', name: 'Mega Evolution: Pitch Black Elite Trainer Box', slug: 'mega-evolution-pitch-black-elite-trainer-box',
    description: 'Factory sealed Mega Evolution: Pitch Black Elite Trainer Box. Includes 9 booster packs.',
    productType: 'sealed', category: 'sealed', price: 69.95, compareAtPrice: 84.95, stock: 18,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pb_etb_ad_360x504.png?v=1783633046'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Pitch Black', setSlug: 'mega-evolution-pitch-black',
  },
  {
    id: 'pcs-009', name: 'Mega Evolution: Pitch Black Booster Bundle', slug: 'mega-evolution-pitch-black-booster-bundle',
    description: 'Factory sealed Mega Evolution: Pitch Black Booster Bundle. 6 booster packs.',
    productType: 'sealed', category: 'sealed', price: 39.95, compareAtPrice: 44.95, stock: 22,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pb_bun_ad_360x504.png?v=1783632793'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Pitch Black', setSlug: 'mega-evolution-pitch-black',
  },
  {
    id: 'pcs-010', name: 'Mega Evolution: Pitch Black 3-Pack Blister', slug: 'mega-evolution-pitch-black-3-pack-blister',
    description: 'Factory sealed Mega Evolution: Pitch Black 3-Pack Blister. 3 booster packs with promo card.',
    productType: 'sealed', category: 'sealed', price: 21.95, stock: 28,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pb_3_ad_360x504.png?v=1783632642'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Pitch Black', setSlug: 'mega-evolution-pitch-black',
  },
  {
    id: 'pcs-011', name: 'Mega Evolution: Pitch Black Single Pack Blister', slug: 'mega-evolution-pitch-black-single-pack-blister',
    description: 'Factory sealed Mega Evolution: Pitch Black Single Pack Blister. 1 booster pack with promo card.',
    productType: 'sealed', category: 'sealed', price: 6.95, compareAtPrice: 8.95, stock: 35,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pb_single_ad_360x504.png?v=1783633129'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Pitch Black', setSlug: 'mega-evolution-pitch-black',
  },
  {
    id: 'pcs-012', name: 'Mega Evolution: Pitch Black Sleeved Booster Pack', slug: 'mega-evolution-pitch-black-sleeved-booster-pack',
    description: 'Single Mega Evolution: Pitch Black Sleeved Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 5.95, stock: 40,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pb_sleeve_ad_360x504.png?v=1783633213'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Pitch Black', setSlug: 'mega-evolution-pitch-black',
  },
  {
    id: 'pcs-013', name: 'Mega Evolution: Pitch Black Booster Pack', slug: 'mega-evolution-pitch-black-booster-pack',
    description: 'Single Mega Evolution: Pitch Black Booster Pack. 10 cards per pack.',
    productType: 'sealed', category: 'sealed', price: 5.95, stock: 45,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pb_bp_ad_360x504.png?v=1783632933'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Pitch Black', setSlug: 'mega-evolution-pitch-black',
  },

  // === SEALED: MEGA EVOLUTION CHAOS RISING ===
  {
    id: 'pcs-014', name: 'Mega Evolution: Chaos Rising Booster Box', slug: 'mega-evolution-chaos-rising-booster-box',
    description: 'Factory sealed Mega Evolution: Chaos Rising Booster Box. 36 packs per box.',
    productType: 'sealed', category: 'sealed', price: 186.95, compareAtPrice: 214.95, stock: 10,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/crb_bb_2_360x504.png?v=1778856730'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Chaos Rising', setSlug: 'mega-evolution-chaos-rising',
  },
  {
    id: 'pcs-015', name: 'Mega Evolution: Chaos Rising Booster Bundle', slug: 'mega-evolution-chaos-rising-booster-bundle',
    description: 'Factory sealed Mega Evolution: Chaos Rising Booster Bundle. 6 booster packs.',
    productType: 'sealed', category: 'sealed', price: 37.95, compareAtPrice: 42.95, stock: 18,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/cr_bun_360x504.png?v=1778856731'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Chaos Rising', setSlug: 'mega-evolution-chaos-rising',
  },
  {
    id: 'pcs-016', name: 'Mega Evolution: Chaos Rising 3-Pack Blister', slug: 'mega-evolution-chaos-rising-3-pack-blister',
    description: 'Factory sealed Mega Evolution: Chaos Rising 3-Pack Blister. 3 booster packs with promo card.',
    productType: 'sealed', category: 'sealed', price: 19.95, stock: 25,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/cr_3p_360x504.png?v=1778856731'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Chaos Rising', setSlug: 'mega-evolution-chaos-rising',
  },
  {
    id: 'pcs-017', name: 'Mega Evolution: Chaos Rising Single Pack Blister', slug: 'mega-evolution-chaos-rising-single-pack-blister',
    description: 'Factory sealed Mega Evolution: Chaos Rising Single Pack Blister. 1 booster pack with promo card.',
    productType: 'sealed', category: 'sealed', price: 7.49, stock: 30,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/cr_spb_360x504.png?v=1778856730'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Chaos Rising', setSlug: 'mega-evolution-chaos-rising',
  },
  {
    id: 'pcs-018', name: 'Mega Evolution: Chaos Rising Sleeved Booster Pack', slug: 'mega-evolution-chaos-rising-sleeved-booster-pack',
    description: 'Single Mega Evolution: Chaos Rising Sleeved Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 6.95, stock: 40,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/cr_sbp_2_360x504.png?v=1778857408'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Chaos Rising', setSlug: 'mega-evolution-chaos-rising',
  },

  // === SEALED: MEGA EVOLUTION PERFECT ORDER ===
  {
    id: 'pcs-019', name: 'Mega Evolution: Perfect Order Booster Box', slug: 'mega-evolution-perfect-order-booster-box',
    description: 'Factory sealed Mega Evolution: Perfect Order Booster Box. 36 packs per box.',
    productType: 'sealed', category: 'sealed', price: 171.95, compareAtPrice: 179.95, stock: 12,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pobb_360x504.png?v=1767887844'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Perfect Order', setSlug: 'mega-evolution-perfect-order',
  },
  {
    id: 'pcs-020', name: 'Mega Evolution: Perfect Order Booster Bundle', slug: 'mega-evolution-perfect-order-booster-bundle',
    description: 'Factory sealed Mega Evolution: Perfect Order Booster Bundle. 6 booster packs.',
    productType: 'sealed', category: 'sealed', price: 39.95, stock: 20,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pobun_360x504.png?v=1767888020'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Perfect Order', setSlug: 'mega-evolution-perfect-order',
  },
  {
    id: 'pcs-021', name: 'Mega Evolution: Perfect Order 3-Pack Blister', slug: 'mega-evolution-perfect-order-3-pack-blister',
    description: 'Factory sealed Mega Evolution: Perfect Order 3-Pack Blister. 3 booster packs with promo card.',
    productType: 'sealed', category: 'sealed', price: 19.95, stock: 25,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/po3_742178e9-d147-4fc5-9139-afb4a7860a15_360x504.png?v=1770148214'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Perfect Order', setSlug: 'mega-evolution-perfect-order',
  },
  {
    id: 'pcs-022', name: 'Mega Evolution: Perfect Order Single Pack Blister', slug: 'mega-evolution-perfect-order-single-pack-blister',
    description: 'Factory sealed Mega Evolution: Perfect Order Single Pack Blister. 1 booster pack with promo card.',
    productType: 'sealed', category: 'sealed', price: 7.95, stock: 30,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/posingle_304e0ba4-7467-4274-b72f-e1c143512103_360x504.png?v=1770148111'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Perfect Order', setSlug: 'mega-evolution-perfect-order',
  },
  {
    id: 'pcs-023', name: 'Mega Evolution: Perfect Order Sleeved Booster Pack', slug: 'mega-evolution-perfect-order-sleeved-booster-pack',
    description: 'Single Mega Evolution: Perfect Order Sleeved Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 6.95, stock: 40,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/posleeeve_796a30e1-b82e-414f-a9a3-241d0c684d91_360x504.png?v=1770148054'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Perfect Order', setSlug: 'mega-evolution-perfect-order',
  },
  {
    id: 'pcs-024', name: 'Mega Evolution: Perfect Order Booster Pack', slug: 'mega-evolution-perfect-order-booster-pack',
    description: 'Single Mega Evolution: Perfect Order Booster Pack. 10 cards per pack.',
    productType: 'sealed', category: 'sealed', price: 4.95, stock: 50,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/pobp_360x504.png?v=1767887970'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Perfect Order', setSlug: 'mega-evolution-perfect-order',
  },

  // === SEALED: MEGA EVOLUTION ASCENDED HEROES ===
  {
    id: 'pcs-025', name: 'Mega Evolution: Ascended Heroes Booster Pack', slug: 'mega-evolution-ascended-heroes-booster-pack',
    description: 'Single Mega Evolution: Ascended Heroes Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 14.95, stock: 30,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/asche_a2b271e1-25cf-4404-9ca2-796289e4e2c4_360x504.png?v=1775846624'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Evolution: Ascended Heroes', setSlug: 'mega-evolution-ascended-heroes',
  },

  // === SEALED: SCARLET & VIOLET DESTINED RIVALS ===
  {
    id: 'pcs-026', name: 'Scarlet & Violet: Destined Rivals Booster Bundle', slug: 'scarlet-violet-destined-rivals-booster-bundle',
    description: 'Factory sealed Scarlet & Violet: Destined Rivals Booster Bundle. 6 booster packs.',
    productType: 'sealed', category: 'sealed', price: 68.95, stock: 15,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/drbun_741f076f-2761-4991-be8b-d62fdd53a047_360x504.png?v=1743101253'],
    condition: 'Factory Sealed', language: 'English', set: 'Scarlet & Violet: Destined Rivals', setSlug: 'scarlet-violet-destined-rivals',
  },

  // === SEALED: JAPANESE PRODUCTS ===
  {
    id: 'pcs-027', name: 'Japanese Storm Emeralda Booster Box', slug: 'japanese-storm-emeralda-booster-box',
    description: 'Factory sealed Japanese Storm Emeralda Booster Box. Japanese text.',
    productType: 'sealed', category: 'sealed', price: 149.95, compareAtPrice: 184.95, stock: 8,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/sebb_360x504.png?v=1785966257'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Storm Emeralda', setSlug: 'storm-emeralda',
  },
  {
    id: 'pcs-028', name: 'Japanese Pokemon Center Special Box - Fukuoka', slug: 'japanese-pokemon-center-special-box-fukuoka',
    description: 'Japanese Pokemon Center Special Box Collection exclusive to Fukuoka.',
    productType: 'sealed', category: 'sealed', price: 169.95, compareAtPrice: 219.95, stock: 5,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/scbFukuoka_360x504.png?v=1785256692'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Pokemon Center Special Box', setSlug: 'pokemon-center-special-box',
  },
  {
    id: 'pcs-029', name: 'Japanese Pokemon Center Special Box - Hiroshima', slug: 'japanese-pokemon-center-special-box-hiroshima',
    description: 'Japanese Pokemon Center Special Box Collection exclusive to Hiroshima.',
    productType: 'sealed', category: 'sealed', price: 184.95, compareAtPrice: 229.95, stock: 5,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/sbchiroshima_360x504.png?v=1785256724'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Pokemon Center Special Box', setSlug: 'pokemon-center-special-box',
  },
  {
    id: 'pcs-030', name: 'Japanese Pokemon Center Special Box - Tohoku', slug: 'japanese-pokemon-center-special-box-tohoku',
    description: 'Japanese Pokemon Center Special Box Collection exclusive to Tohoku.',
    productType: 'sealed', category: 'sealed', price: 149.95, compareAtPrice: 189.95, stock: 5,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/scbtohoku_360x504.png?v=1785256659'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Pokemon Center Special Box', setSlug: 'pokemon-center-special-box',
  },
  {
    id: 'pcs-031', name: 'Japanese Abyss Eye Booster Box', slug: 'japanese-abyss-eye-booster-box',
    description: 'Factory sealed Japanese Abyss Eye Booster Box.',
    productType: 'sealed', category: 'sealed', price: 87.95, compareAtPrice: 124.95, stock: 10,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/aae_bb_360x504.png?v=1779977164'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Abyss Eye', setSlug: 'abyss-eye',
  },
  {
    id: 'pcs-032', name: 'Japanese Abyss Eye Booster Pack', slug: 'japanese-abyss-eye-booster-pack',
    description: 'Single Japanese Abyss Eye Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 3.49, stock: 50,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/aeboosterpack_360x504.png?v=1783544157'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Abyss Eye', setSlug: 'abyss-eye',
  },
  {
    id: 'pcs-033', name: 'Japanese Ninja Spinner Booster Box', slug: 'japanese-ninja-spinner-booster-box',
    description: 'Factory sealed Japanese Ninja Spinner Booster Box.',
    productType: 'sealed', category: 'sealed', price: 99.95, compareAtPrice: 119.95, stock: 8,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/ns_bb_360x504.png?v=1773925407'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Ninja Spinner', setSlug: 'ninja-spinner',
  },
  {
    id: 'pcs-034', name: 'Japanese Ninja Spinner Booster Pack', slug: 'japanese-ninja-spinner-booster-pack',
    description: 'Single Japanese Ninja Spinner Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 3.95, stock: 45,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/Untitled_6be2158c-0c97-48a9-b5fe-a296929b4d3a_360x504.png?v=1773688019'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Ninja Spinner', setSlug: 'ninja-spinner',
  },
  {
    id: 'pcs-035', name: 'Japanese Munikis Zero Booster Box', slug: 'japanese-munikis-zero-booster-box',
    description: 'Factory sealed Japanese Munikis Zero Booster Box.',
    productType: 'sealed', category: 'sealed', price: 87.95, compareAtPrice: 99.95, stock: 8,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/mzbb_7b9f530d-dc02-48ab-8430-bb467621c830_360x504.png?v=1770317932'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Munikis Zero', setSlug: 'munikis-zero',
  },
  {
    id: 'pcs-036', name: 'Japanese Munikis Zero Booster Pack', slug: 'japanese-munikis-zero-booster-pack',
    description: 'Single Japanese Munikis Zero Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 2.95, stock: 50,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/mzbp_d9b68391-b79a-469b-8038-9bf5cb4a6674_360x504.png?v=1770318476'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Munikis Zero', setSlug: 'munikis-zero',
  },
  {
    id: 'pcs-037', name: 'Japanese Mega Dream ex Booster Box', slug: 'japanese-mega-dream-ex-booster-box',
    description: 'Factory sealed Japanese Mega Dream ex Booster Box.',
    productType: 'sealed', category: 'sealed', price: 123.95, compareAtPrice: 149.95, stock: 6,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/megadreambb_87b31ef2-639a-4044-8a3c-eaf538053bc8_360x504.png?v=1764787791'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Mega Dream ex', setSlug: 'mega-dream-ex',
  },
  {
    id: 'pcs-038', name: 'Japanese Mega Dream ex Booster Pack', slug: 'japanese-mega-dream-ex-booster-pack',
    description: 'Single Japanese Mega Dream ex Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 13.49, stock: 25,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/megabp_5093a790-4ee8-432c-bd50-e9bff9986d8a_360x504.png?v=1764883048'],
    condition: 'Factory Sealed', language: 'Japanese', set: 'Mega Dream ex', setSlug: 'mega-dream-ex',
  },

  // === SEALED: COLLECTIONS & TINS ===
  {
    id: 'pcs-039', name: 'Pokemon 30th Celebration Tech Sticker Collection', slug: 'pokemon-30th-celebration-tech-sticker-collection',
    description: 'Pokemon 30th Anniversary Tech Sticker Collection featuring Alolan Exeggutor.',
    productType: 'sealed', category: 'sealed', price: 48.95, stock: 12,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/30thteche_360x504.png?v=1782919371'],
    condition: 'Factory Sealed', language: 'English', set: '30th Anniversary', setSlug: '30th-anniversary',
  },
  {
    id: 'pcs-040', name: 'Pokemon 30th Celebration Poster Collection', slug: 'pokemon-30th-celebration-poster-collection',
    description: 'Pokemon 30th Anniversary Poster Collection with booster packs and posters.',
    productType: 'sealed', category: 'sealed', price: 54.95, stock: 10,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/Pokemon_TCG_30th_Celebration_Poster_Collection_EN-copy-scaled-removebg_360x504.png?v=1782919145'],
    condition: 'Factory Sealed', language: 'English', set: '30th Anniversary', setSlug: '30th-anniversary',
  },
  {
    id: 'pcs-041', name: 'First Partner Illustration Collection - Series 3', slug: 'first-partner-illustration-collection-series-3',
    description: 'First Partner Illustration Collection Series 3 featuring starter Pokemon.',
    productType: 'sealed', category: 'sealed', price: 31.95, stock: 15,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/fps3_360x504.png?v=1786570126'],
    condition: 'Factory Sealed', language: 'English', set: 'First Partner', setSlug: 'first-partner',
  },
  {
    id: 'pcs-042', name: 'First Partner Illustration Collection - Series 2', slug: 'first-partner-illustration-collection-series-2',
    description: 'First Partner Illustration Collection Series 2 featuring starter Pokemon.',
    productType: 'sealed', category: 'sealed', price: 28.95, compareAtPrice: 29.95, stock: 12,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/fpo2_360x504.png?v=1781883999'],
    condition: 'Factory Sealed', language: 'English', set: 'First Partner', setSlug: 'first-partner',
  },
  {
    id: 'pcs-043', name: 'Pokemon 2026 Q1 Mini Portfolio', slug: 'pokemon-2026-q1-mini-portfolio',
    description: 'Pokemon 2026 Q1 Mini Portfolio with included Phantasmal Flames Booster Pack.',
    productType: 'sealed', category: 'sealed', price: 11.95, stock: 20,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/673294_in_1000x1000_31cd599e-d62a-4435-8a99-076cf7853566_360x504.jpg?v=1778870981'],
    condition: 'Factory Sealed', language: 'English', set: 'Phantasmal Flames', setSlug: 'phantasmal-flames',
  },
  {
    id: 'pcs-044', name: 'Lumiose City Mini Tins (Set of 5)', slug: 'lumiose-city-mini-tins-set-of-5',
    description: 'Lumiose City Mini Tins Set of 5. Each tin contains 2 booster packs.',
    productType: 'sealed', category: 'sealed', price: 64.95, stock: 10,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/Untitled_1_d668c713-55f1-4af1-bbc3-ae22d14224ff_360x504.png?v=1781737491'],
    condition: 'Factory Sealed', language: 'English', set: 'Lumiose City', setSlug: 'lumiose-city',
  },
  {
    id: 'pcs-045', name: 'Mega Moonlit Tin - Mega Gengar ex', slug: 'mega-moonlit-tin-mega-gengar-ex',
    description: 'Mega Moonlit Tin featuring Mega Gengar ex with booster packs.',
    productType: 'sealed', category: 'sealed', price: 32.95, stock: 12,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/mega_gen_360x504.png?v=1780947601'],
    condition: 'Factory Sealed', language: 'English', set: 'Mega Moonlit', setSlug: 'mega-moonlit',
  },
  {
    id: 'pcs-046', name: 'Mega Lucario ex League Battle Deck', slug: 'mega-lucario-ex-league-battle-deck',
    description: 'Mega Lucario ex League Battle Deck ready-to-play with 60 cards.',
    productType: 'sealed', category: 'sealed', price: 14.49, compareAtPrice: 29.95, stock: 18,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/lucario_league_2_360x504.png?v=1778863852'],
    condition: 'Factory Sealed', language: 'English', set: 'League Battle Deck', setSlug: 'league-battle-deck',
  },
  {
    id: 'pcs-047', name: 'Mega Zygarde ex Premium Collection', slug: 'mega-zygarde-ex-premium-collection',
    description: 'Mega Zygarde ex Premium Collection with booster packs and premium card.',
    productType: 'sealed', category: 'sealed', price: 50.95, stock: 10,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/mega_zyg_360x504.png?v=1779737106'],
    condition: 'Factory Sealed', language: 'English', set: 'Premium Collection', setSlug: 'premium-collection',
  },
  {
    id: 'pcs-048', name: 'Pokemon Day 2026 Collection', slug: 'pokemon-day-2026-collection',
    description: 'Pokemon Day 2026 special collection with exclusive items.',
    productType: 'sealed', category: 'sealed', price: 37.95, stock: 15,
    images: ['https://cdn.shopify.com/s/files/1/0468/5299/7280/files/2026pcday_360x504.png?v=1769722020'],
    condition: 'Factory Sealed', language: 'English', set: 'Pokemon Day 2026', setSlug: 'pokemon-day-2026',
  },

  // === ACCESSORIES: BLIND BOX FIGURINES ===
  {
    id: 'pc-001', name: 'Pokemon Circular Diorama Collection 2 - Blind Box', slug: 'pokemon-circular-diorama-collection-2-blind-box',
    description: 'Circular Diorama Collection 2 featuring Sparkling Moment Pokemon figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 15,
    images: ['https://poke-collect.com/cdn/shop/files/CDrement.png?v=1783617888&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-002', name: 'Pokemon Decorative Frame 2 - Blind Box', slug: 'pokemon-decorative-frame-2-blind-box',
    description: 'Decorative Frame 2 featuring Beyond the Boundaries Pokemon figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 21,
    images: ['https://poke-collect.com/cdn/shop/files/decoframe.png?v=1783620914&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-003', name: 'Pokemon Diamond Dust Blind Box', slug: 'pokemon-diamond-dust-blind-box',
    description: 'Diamond Dust collection featuring sparkling Pokemon figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 20,
    images: ['https://poke-collect.com/cdn/shop/files/DD.png?v=1772558573&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-004', name: 'Pokemon Pocket Bonsai 3 Blind Box', slug: 'pokemon-pocket-bonsai-3-blind-box',
    description: 'Pocket Bonsai 3 collection featuring miniature Pokemon bonsai figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 0,
    images: ['https://poke-collect.com/cdn/shop/files/bonsai3.png?v=1772558602&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-005', name: 'Pokemon DesQ Battle On Desk - Blind Box', slug: 'pokemon-desq-battle-on-desk-blind-box',
    description: 'DesQ Battle On Desk collection featuring battle scene Pokemon figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 14.95, stock: 18,
    images: ['https://poke-collect.com/cdn/shop/files/batle_desk.png?v=1746295177&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-006', name: 'Pokemon Gemstone Collection - Blind Box', slug: 'pokemon-gemstone-collection-blind-box',
    description: 'Gemstone Collection featuring Shining Miracle of Mystery Pokemon figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 3,
    images: ['https://poke-collect.com/cdn/shop/files/gem.png?v=1746295248&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-007', name: 'Pokemon Neon Party Blind Box', slug: 'pokemon-neon-party-blind-box',
    description: 'Neon Party collection featuring vibrant neon-styled Pokemon figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 0,
    images: ['https://poke-collect.com/cdn/shop/files/NP_f2e19006-0aad-4181-bccb-3445f38a23ab.png?v=1772558613&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-008', name: 'Pokemon Soft and Swaying Decoration - Blind Box', slug: 'pokemon-soft-and-swaying-decoration-blind-box',
    description: 'Soft and Swaying Decoration collection featuring gentle-moving Pokemon figurines. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 7,
    images: ['https://poke-collect.com/cdn/shop/files/SS_ed3fc07d-4019-46d0-9711-f279d341b8f5.png?v=1772558568&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-009', name: 'Pokemon Little Night 2 - Blind Box', slug: 'pokemon-little-night-2-blind-box',
    description: 'Little Night 2 collection featuring adorable Pokemon figurines in dark-themed settings. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 1,
    images: ['https://poke-collect.com/cdn/shop/files/LN.png?v=1772558582&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-010', name: 'Pokemon Lantern Diorama Blind Box', slug: 'pokemon-lantern-diorama-blind-box',
    description: 'Lantern Diorama collection featuring Pokemon figurines with lantern-themed dioramas. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 0,
    images: ['https://poke-collect.com/cdn/shop/files/LD.png?v=1772558647&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-011', name: 'Pokemon Swing Vignette - Blind Box', slug: 'pokemon-swing-vignette-blind-box',
    description: 'Swing Vignette collection featuring Pokemon figurines in swinging vignette displays. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 16.95, stock: 0,
    images: ['https://poke-collect.com/cdn/shop/files/SV4.png?v=1772558569&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
  {
    id: 'pc-012', name: 'Pokemon Terrarium 15 Blind Box', slug: 'pokemon-terrarium-15-blind-box',
    description: 'Terrarium 15 collection featuring Pokemon figurines in terrarium-style displays. Each blind box contains one random figurine.',
    productType: 'accessory', category: 'accessories', price: 17.95, stock: 0,
    images: ['https://poke-collect.com/cdn/shop/files/Untitled_deac68df-dba9-4a71-8781-d170a8bf5e29.png?v=1769804869&width=300'],
    condition: 'Factory Sealed', language: 'Japanese',
  },
];

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(IMAGE_DIR, filename);
    const file = fs.createWriteStream(filePath);
    
    const cleanUrl = url.replace(/\\//g, '/');
    
    https.get(cleanUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(`/products/poke-collect/${filename}`); });
        }).on('error', reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(`/products/poke-collect/${filename}`); });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  console.log(`Importing ${allProducts.length} products from poke-collect.com...\n`);

  // Download images
  let downloaded = 0;
  let failed = 0;

  for (const product of allProducts) {
    const localImages = [];
    
    for (let i = 0; i < product.images.length; i++) {
      const imageUrl = product.images[i];
      const ext = imageUrl.includes('.jpg') ? '.jpg' : '.png';
      const filename = `${product.slug}${ext}`;
      
      try {
        const localPath = await downloadImage(imageUrl, filename);
        localImages.push(localPath);
        downloaded++;
      } catch (error) {
        console.log(`  Failed: ${filename} - using remote URL`);
        localImages.push(imageUrl);
        failed++;
      }
    }
    
    product.images = localImages;
  }

  // Save updated products
  const outputContent = `// Auto-generated import from poke-collect.com
// Downloaded: ${new Date().toISOString()}
import { Product } from '@/types';

export const pokeCollectImportProducts: Product[] = ${JSON.stringify(allProducts.map(p => ({
  ...p,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})), null, 2)};
`;

  const outputPath = path.join(__dirname, '..', 'src', 'seed', 'poke-collect-import.ts');
  fs.writeFileSync(outputPath, outputContent);

  console.log(`\n=== IMPORT SUMMARY ===`);
  console.log(`Total products: ${allProducts.length}`);
  console.log(`Images downloaded: ${downloaded}`);
  console.log(`Images failed: ${failed}`);
  console.log(`\nProduct breakdown:`);
  
  const sealed = allProducts.filter(p => p.productType === 'sealed');
  const accessories = allProducts.filter(p => p.productType === 'accessory');
  
  console.log(`  Sealed products: ${sealed.length}`);
  console.log(`  Accessories (Blind Boxes): ${accessories.length}`);
  
  console.log(`\nBy set:`);
  const bySet = {};
  allProducts.forEach(p => {
    const set = p.set || 'Unknown';
    bySet[set] = (bySet[set] || 0) + 1;
  });
  Object.entries(bySet).sort((a, b) => b[1] - a[1]).forEach(([set, count]) => {
    console.log(`  ${set}: ${count} products`);
  });
  
  console.log(`\nSaved to: ${outputPath}`);
  console.log(`\nNext steps:`);
  console.log(`1. Run: npm run dev`);
  console.log(`2. Call API: POST http://localhost:3000/api/import/poke-collect-all`);
}

main().catch(console.error);
