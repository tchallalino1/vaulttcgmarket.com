import Link from 'next/link';

export const metadata = {
  title: 'Sell Your Cards — Vault TCG Market',
  description: 'List your Pokémon cards and reach thousands of collectors worldwide.',
};

export default function SellPage() {
  const steps = [
    {
      title: 'Create a Listing',
      description: 'Upload photos and details of your cards. Our tools make it easy to list in minutes.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ),
    },
    {
      title: 'Set Your Price',
      description: 'Use our competitive pricing tools to set the right price. See real-time market data.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Reach Collectors',
      description: 'Listings are seen by thousands of active buyers. Get exposure to serious collectors.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: 'Get Paid',
      description: 'Fast and secure payouts directly to your bank account. No hidden fees.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
    },
  ];

  const benefits = [
    {
      title: 'Low Commission Rates',
      description: 'Keep more of your earnings with our competitive seller fees starting at just 5%.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Seller Protection',
      description: 'Our buyer protection program ensures you get paid for every legitimate sale.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: 'Global Reach',
      description: 'Access buyers from around the world. Our marketplace serves collectors globally.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track your sales performance, views, and conversion rates in real-time.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
    },
  ];

  const faqs = [
    { question: 'What can I sell?', answer: 'You can sell raw singles, graded cards (PSA, CGC, BGS), sealed products, vintage cards, and Pokémon TCG accessories.' },
    { question: 'What are the fees?', answer: 'We charge a flat 5% commission on all sales. No listing fees, no hidden charges. Payment processing is included.' },
    { question: 'How do I ship?', answer: 'We provide prepaid shipping labels for domestic orders. Sellers are responsible for secure packaging using penny sleeves, top loaders, and bubble mailers.' },
    { question: 'When do I get paid?', answer: 'Payouts are processed within 2-3 business days after the buyer confirms receipt. Funds are sent directly to your linked bank account.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0a0a1a] py-16">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-4">✦ Join Thousands of Sellers</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            SELL YOUR POKÉMON CARDS
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
            Turn your collection into value. Reach thousands of collectors worldwide.
          </p>
          <Link
            href="/sell"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 py-3 transition-colors duration-200 text-sm"
          >
            START SELLING →
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <span className="inline-block text-xs font-bold text-purple-600 bg-purple-50 rounded-full px-2.5 py-0.5 mb-3">Step {i + 1}</span>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Sell on Vault?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Seller FAQ</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Start Selling?</h2>
          <p className="text-purple-100 mb-6 max-w-md mx-auto">Join our community of sellers and turn your Pokémon TCG collection into profit.</p>
          <Link
            href="/sell"
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold rounded-lg px-8 py-3 hover:bg-gray-100 transition-colors text-sm"
          >
            CREATE YOUR FIRST LISTING →
          </Link>
        </section>
      </div>
    </div>
  );
}
