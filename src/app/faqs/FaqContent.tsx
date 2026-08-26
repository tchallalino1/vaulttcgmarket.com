'use client';
import { useState } from 'react';
import Link from 'next/link';

const faqCategories = [
  {
    title: 'Orders & Payments',
    questions: [
      { q: 'How do I place an order?', a: 'Browse our marketplace, add items to your cart, and proceed to checkout. You can pay with Apple Pay, Cash App, Chime, Bitcoin, Zelle, Wise, Bank Transfer, Revolut, or GCash.' },
      { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 1 hour of placement if they haven\'t been processed by the seller. Contact support for assistance.' },
      { q: 'What payment methods do you accept?', a: 'We accept Apple Pay, Cash App, Chime, Bitcoin, Zelle, Wise Transfer, Bank Transfer, Revolut, and GCash. All transactions are securely processed.' },
      { q: 'Is my payment information secure?', a: 'Yes. All payments are processed through encrypted, secure channels. We never store your wallet addresses or payment credentials.' },
    ],
  },
  {
    title: 'Shipping & Delivery',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-7 business days. Express shipping takes 1-3 business days. International shipping varies by destination.' },
      { q: 'Do you ship internationally?', a: 'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.' },
      { q: 'How are cards packaged?', a: 'All cards are shipped in protective sleeves, top loaders, and bubble mailers. Graded cards ship in their original cases with additional padding.' },
      { q: 'Is shipping insured?', a: 'Yes. All shipments are fully insured against loss and damage during transit.' },
    ],
  },
  {
    title: 'Returns & Refunds',
    questions: [
      { q: 'What is your return policy?', a: 'You can return most items within 14 days of delivery if they don\'t match the listing description. Items must be in original condition.' },
      { q: 'How do I start a return?', a: 'Contact our support team with your order number and reason for return. We\'ll provide a prepaid return label and RMA number.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 3-5 business days after we receive the returned item. The refund will be issued to your original payment method.' },
    ],
  },
  {
    title: 'Authentication',
    questions: [
      { q: 'How are cards verified?', a: 'Every card goes through our multi-point authentication process. Our team of experts verifies authenticity, condition, and grading accuracy.' },
      { q: 'What grading companies do you support?', a: 'We work with PSA, CGC, BGS, SGC, and ACE grading companies. All graded cards are verified against the grading company\'s database.' },
      { q: 'What if I receive a counterfeit card?', a: 'We have a zero-tolerance policy for counterfeits. If you receive a fake card, contact us immediately for a full refund and return.' },
    ],
  },
  {
    title: 'Selling',
    questions: [
      { q: 'How do I become a seller?', a: 'Create an account, verify your identity, and start listing your cards. There are no upfront fees — you only pay a small commission when items sell.' },
      { q: 'What are the selling fees?', a: 'We charge a competitive commission on each sale. Visit our Sell page for detailed pricing information.' },
      { q: 'How do I get paid?', a: 'Payments are sent directly to your chosen payment account within 2-3 business days of delivery confirmation.' },
    ],
  },
  {
    title: 'Account',
    questions: [
      { q: 'How do I create an account?', a: 'Click the Account icon in the header and select "Create Account." You\'ll need to provide your name, email, and create a password.' },
      { q: 'How do I reset my password?', a: 'Click "Forgot password?" on the sign-in page. We\'ll send a password reset link to your registered email address.' },
      { q: 'How do I delete my account?', a: 'Contact our support team to request account deletion. Please note this action is permanent and cannot be undone.' },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-medium text-sm pr-4">{q}</span>
        <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">FAQs</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">FREQUENTLY ASKED QUESTIONS</h1>
      <p className="text-gray-500 mb-10 max-w-2xl">Find answers to common questions about buying, selling, and using Vault TCG Market.</p>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-56 flex-shrink-0">
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {faqCategories.map((cat, i) => (
              <button key={cat.title} onClick={() => setActiveCategory(i)} className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${activeCategory === i ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">{faqCategories[activeCategory].title}</h2>
          <div className="space-y-3">
            {faqCategories[activeCategory].questions.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
        <p className="text-gray-500 mb-4">Our support team is here to help.</p>
        <Link href="/contact" className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">Contact Support</Link>
      </div>
    </div>
  );
}
