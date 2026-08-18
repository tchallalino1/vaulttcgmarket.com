import { HeroSection } from '@/components/hero/HeroSection';
import { ExploreByType } from '@/components/categories/ExploreByType';
import { PopularPokemon } from '@/components/pokemon/PopularPokemon';
import { TrendingProducts } from '@/components/products/TrendingProducts';
import { MarketInsights } from '@/components/market/MarketInsights';
import { TrustSection } from '@/components/trust/TrustSection';

export const metadata = {
  title: 'Vault TCG Market — Premium Pokémon TCG Marketplace',
  description: 'Discover rare cards, graded treasures, and sealed collectibles from trusted sellers around the world.',
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExploreByType />
        <PopularPokemon />
        <TrendingProducts />
        <MarketInsights />
        <TrustSection />
      </div>
    </div>
  );
}
