export const metadata = {
  title: 'Track Order — Vault TCG Market',
  description: 'Track your order status and delivery.',
};

import { TrackOrderForm } from '@/components/track-order/TrackOrderForm';

export default function TrackOrderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">TRACK ORDER</h1>
        <p className="text-gray-500 mb-8">Enter your order details to track your shipment.</p>
        <TrackOrderForm />
      </div>
    </div>
  );
}
