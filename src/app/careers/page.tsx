import Link from 'next/link';

export const metadata = {
  title: 'Careers — Vault TCG Market',
  description: 'Join the Vault TCG Market team.',
};

export default function CareersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Careers</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">CAREERS</h1>
        <p className="text-gray-500 mb-10 text-lg">Join our team and help build the future of Pokémon TCG collecting.</p>

        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 text-white mb-10">
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-purple-200 leading-relaxed">We&apos;re building the most trusted marketplace for Pokémon TCG collectors worldwide. Our team is passionate about creating exceptional experiences for buyers and sellers.</p>
        </div>

        <h2 className="text-xl font-semibold mb-6">Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {['Health & Dental Insurance', 'Flexible Remote Work', 'Unlimited PTO', 'Employee Card Discounts', 'Learning Budget', 'Team Events'].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
              <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-6">Current Openings</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-gray-500 mb-2">No positions available right now.</p>
          <p className="text-sm text-gray-400">Check back soon or send your resume to <span className="text-purple-600">careers@vaulttcgmarket.com</span></p>
        </div>
      </div>
    </div>
  );
}
