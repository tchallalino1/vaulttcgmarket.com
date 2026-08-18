import Link from 'next/link';

export const metadata = {
  title: 'Vault Access — Vault TCG Market',
  description: 'Exclusive drops, rare cards, and premium inventory for Vault members.',
};

export default function VaultPage() {
  const features = [
    {
      title: 'Exclusive Inventory',
      description: 'Rare finds and hard-to-get cards that are not available anywhere else on the marketplace.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    {
      title: 'Early Access',
      description: 'Be the first to access new listings before they go live to the general public.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      title: 'Premium Drops',
      description: 'Limited edition releases and exclusive product drops available only to Vault members.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
    {
      title: 'Collector Benefits',
      description: 'Priority support, exclusive discounts, and special perks for loyal Vault members.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0a0a1a] py-20">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-4">✦ Premium Access</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            VAULT ACCESS
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
            Exclusive drops, rare cards, and premium inventory.
          </p>
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 py-3 transition-colors duration-200 text-sm"
          >
            JOIN VAULT →
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Features Grid */}
        <section className="mb-16">
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Join */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">How to Join</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Create an Account', desc: 'Sign up for a free Vault TCG Market account.' },
                { step: '2', title: 'Verify Your Profile', desc: 'Complete your profile verification to unlock Vault Access.' },
                { step: '3', title: 'Start Exploring', desc: 'Browse exclusive inventory, early access listings, and premium drops.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0a0a1a] rounded-2xl p-8 sm:p-12 text-center text-white">
          <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">Unlock the Vault</h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">Get access to the rarest cards and exclusive drops before anyone else.</p>
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-8 py-3 transition-colors text-sm"
          >
            JOIN VAULT ACCESS →
          </Link>
        </section>
      </div>
    </div>
  );
}
