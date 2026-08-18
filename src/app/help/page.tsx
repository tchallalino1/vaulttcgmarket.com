export const metadata = {
  title: 'Help Center — Vault TCG Market',
  description: 'Get help with orders, shipping, returns, authentication, and more.',
};

import { HelpContent } from '@/components/help/HelpContent';

export default function HelpPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">HELP CENTER</h1>
        <p className="text-gray-500 mb-8">Get help with orders, shipping, returns, authentication, and more.</p>
        <HelpContent />
      </div>
    </div>
  );
}
