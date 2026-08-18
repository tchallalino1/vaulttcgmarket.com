'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqSections: { category: string; icon: React.ReactNode; items: FAQItem[] }[] = [
  {
    category: 'Orders & Payments',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    items: [
      { question: 'How do I place an order?', answer: 'Browse our marketplace, add items to your cart, and proceed to checkout. You can pay with Visa, Mastercard, American Express, or PayPal.' },
      { question: 'Can I cancel my order?', answer: 'You can cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be cancelled. Contact support for assistance.' },
      { question: 'What payment methods do you accept?', answer: 'We accept Visa, Mastercard, American Express, and PayPal. All payments are securely processed with 256-bit SSL encryption.' },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    items: [
      { question: 'How long does shipping take?', answer: 'Standard shipping takes 3-5 business days. Express shipping delivers within 1-2 business days. International orders may take 7-14 business days.' },
      { question: 'Do you ship internationally?', answer: 'Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.' },
      { question: 'How are cards packaged?', answer: 'All cards are shipped in penny sleeves with top loaders, sealed in team bags, and placed in bubble mailers or boxes for maximum protection.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    items: [
      { question: 'What is your return policy?', answer: 'We offer a 14-day return policy for items in their original condition. Graded cards must be returned in their original slabs unopened.' },
      { question: 'How do I start a return?', answer: 'Go to your order history, select the order, and click "Start Return". You will receive a prepaid return label via email.' },
    ],
  },
  {
    category: 'Authentication',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    items: [
      { question: 'How are cards verified?', answer: 'Our team of experts verifies every card listing. We check centering, corners, edges, surface, and authenticity against known benchmarks.' },
      { question: 'What grading companies do you support?', answer: 'We support PSA, CGC, BGS (Beckett), SGC, and ACE grading companies. All graded cards include certification number verification.' },
    ],
  },
  {
    category: 'Selling',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      { question: 'How do I become a seller?', answer: 'Create an account, complete seller verification, and you can start listing immediately. Visit our Sell page for more details.' },
      { question: 'What are the fees?', answer: 'We charge a flat 5% commission on all sales. No listing fees, no monthly subscriptions. Payment processing is included.' },
    ],
  },
  {
    category: 'Account',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    items: [
      { question: 'How do I create an account?', answer: 'Click "Sign Up" in the top navigation. You can register with your email address or sign in with Google/Apple for quick access.' },
      { question: 'How do I reset my password?', answer: 'Click "Forgot Password" on the login page. Enter your email and you will receive a secure link to reset your password.' },
    ],
  },
];

const categories = [
  { name: 'Orders & Payments', count: 3 },
  { name: 'Shipping & Delivery', count: 3 },
  { name: 'Returns & Refunds', count: 2 },
  { name: 'Authentication', count: 2 },
  { name: 'Selling', count: 2 },
  { name: 'Account', count: 2 },
];

export function HelpContent() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  const filteredSections = searchQuery
    ? faqSections
        .map((section) => ({
          ...section,
          items: section.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.items.length > 0)
    : faqSections;

  return (
    <>
      {/* Search */}
      <div className="relative mb-10">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search help topics..."
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Category Cards */}
      {!searchQuery && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                const section = faqSections.find((s) => s.category === cat.name);
                if (section && section.items.length > 0) {
                  const key = `${cat.name}-0`;
                  setOpenIndex(key);
                }
              }}
              className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-purple-200 hover:shadow-sm transition-all"
            >
              <p className="font-medium text-sm">{cat.name}</p>
              <p className="text-xs text-gray-400 mt-1">{cat.count} articles</p>
            </button>
          ))}
        </div>
      )}

      {/* FAQ Sections */}
      <div className="space-y-8">
        {filteredSections.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-purple-600">{section.icon}</div>
              <h2 className="font-semibold">{section.category}</h2>
            </div>
            <div className="space-y-2">
              {section.items.map((item, i) => {
                const key = `${section.category}-${i}`;
                const isOpen = openIndex === key;
                return (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(key)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-medium pr-4">{item.question}</span>
                      <svg
                        className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <section className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="font-semibold text-lg mb-2">Still need help?</h2>
        <p className="text-sm text-gray-500 mb-6">Our support team is available Monday through Friday, 9am to 6pm EST.</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors text-sm"
        >
          CONTACT SUPPORT
        </a>
      </section>
    </>
  );
}
