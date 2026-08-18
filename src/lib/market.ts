import { MarketTrend } from '@/types';
import { seedProducts } from '@/seed/products';

export function getMarketTrend(): MarketTrend {
  const featured = seedProducts.find(p => p.slug.includes('umbreon-vmax'));
  return {
    name: featured?.name || 'Mewtwo VSTAR',
    cardNumber: featured?.cardNumber || '031/078',
    price: featured?.price || 214.99,
    priceChange: 12.4,
    priceChangePercent: 12.4,
    period: 'Last 7 days',
    data: [180, 185, 192, 188, 195, 205, 210, 214.99],
  };
}

export function getMarketInsights() {
  return [
    { title: 'Market Insights', description: 'Real-time price trends and analytics.', cta: 'Explore Market', href: '/market' },
    { title: 'Sell Your Cards', description: 'List your cards and reach thousands of buyers.', cta: 'Start Selling', href: '/sell' },
    { title: 'Vault Access', description: 'Exclusive drops & premium inventory.', cta: 'Join Vault', href: '/vault' },
  ];
}
