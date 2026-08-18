import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders — Vault TCG Admin',
};

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">Orders will appear here once customers start purchasing through the Vault TCG Market storefront.</p>
      </div>
    </div>
  );
}
