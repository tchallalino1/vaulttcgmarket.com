import Link from 'next/link';

export const metadata = {
  title: 'About Us — Vault TCG Market',
  description: 'Learn about Vault TCG Market, the trusted marketplace for Pokémon TCG.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Authenticity',
      description: 'Every card is verified by our expert team. We use advanced detection methods and work with top grading companies to guarantee authenticity.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: 'Trust',
      description: 'Our escrow system protects both buyers and sellers. Secure payments and buyer protection on every transaction.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    {
      title: 'Community',
      description: 'Built by collectors, for collectors. We are passionate about the Pokémon TCG community and dedicated to serving it.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: 'Excellence',
      description: 'From card condition to customer service, we hold ourselves to the highest standards in everything we do.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-4.52 2.024m0 0a6.003 6.003 0 01-4.52-2.024" />
        </svg>
      ),
    },
  ];

  const team = [
    { name: 'Alex Chen', role: 'Founder & CEO', description: 'Pokémon collector since 1999. Built Vault TCG Market to create the marketplace he always wished existed.' },
    { name: 'Sarah Kim', role: 'Head of Operations', description: 'Former card shop owner with 10+ years of experience in the TCG industry and supply chain management.' },
    { name: 'Marcus Rodriguez', role: 'Lead Engineer', description: 'Full-stack developer passionate about building beautiful, performant marketplace experiences.' },
    { name: 'Jamie Park', role: 'Head of Authentication', description: 'PSA-certified authenticator ensuring every card on the platform meets our quality standards.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0a0a1a] py-16">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-4">✦ Our Story</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">ABOUT VAULT TCG MARKET</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            The trusted marketplace for Pokémon TCG collectors worldwide.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <section className="mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Vault TCG Market was founded with a simple goal: create the most trusted, transparent, and enjoyable marketplace for Pokémon TCG collectors. We believe every collector deserves access to authentic cards, fair prices, and a community that shares their passion.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-xs text-purple-600 font-medium mt-0.5 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Join Our Community</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Whether you are buying, selling, or just passionate about Pokémon TCG, we would love to have you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors text-sm"
            >
              GET IN TOUCH
            </Link>
            <Link
              href="/sell"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg px-6 py-3 transition-colors text-sm"
            >
              START SELLING
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
