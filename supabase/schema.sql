-- Vault TCG Market - Supabase Schema
-- Run this in your Supabase SQL Editor

-- Products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  product_type TEXT NOT NULL DEFAULT 'single',
  category TEXT NOT NULL DEFAULT 'singles',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  compare_at_price NUMERIC(10,2),
  currency TEXT NOT NULL DEFAULT 'USD',
  stock INTEGER NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  condition TEXT,
  language TEXT,
  set_name TEXT,
  set_slug TEXT,
  card_number TEXT,
  rarity TEXT,
  pokemon TEXT,
  pokemon_slug TEXT,
  grading_company TEXT,
  grade TEXT,
  certification_number TEXT,
  pokemon_tcg_card_id TEXT,
  price_change NUMERIC(5,2),
  price_change_percent NUMERIC(5,2),
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  seller_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pokemon
CREATE TABLE IF NOT EXISTS pokemon (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT DEFAULT '',
  description TEXT,
  card_count INTEGER DEFAULT 0,
  pokemon_tcg_card_id TEXT,
  popular BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sets
CREATE TABLE IF NOT EXISTS sets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  image_url TEXT,
  release_date TEXT NOT NULL,
  total_cards INTEGER NOT NULL,
  series TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT DEFAULT '',
  description TEXT DEFAULT '',
  product_count INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sellers
CREATE TABLE IF NOT EXISTS sellers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  avatar TEXT,
  email TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  helpful INTEGER DEFAULT 0,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_pokemon ON products(pokemon);
CREATE INDEX IF NOT EXISTS idx_products_set ON products(set_slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_trending ON products(trending);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_pokemon_slug ON pokemon(slug);
CREATE INDEX IF NOT EXISTS idx_pokemon_popular ON pokemon(popular);
CREATE INDEX IF NOT EXISTS idx_sets_slug ON sets(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_sellers_slug ON sellers(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);

-- Seed default seller
INSERT INTO sellers (id, name, slug, rating, review_count, verified)
VALUES ('seller-001', 'Vault TCG Market', 'vault-tcg-market', 5.0, 0, true)
ON CONFLICT (id) DO NOTHING;
