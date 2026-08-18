import { Suspense } from 'react';
import FaqContent from './FaqContent';

export const metadata = {
  title: 'Frequently Asked Questions — Vault TCG Market',
  description: 'Answers to common questions about buying, selling, and using Vault TCG Market.',
};

export default function FaqsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><p className="text-gray-500">Loading...</p></div>}>
      <FaqContent />
    </Suspense>
  );
}
