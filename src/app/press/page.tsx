import Link from 'next/link';

export const metadata = {
  title: 'Press — Vault TCG Market',
  description: 'Press inquiries and media resources for Vault TCG Market.',
};

export default function PressPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Press</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">PRESS</h1>
        <p className="text-gray-500 mb-10 text-lg">Media resources and press information for Vault TCG Market.</p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-10">
          <h2 className="text-xl font-semibold mb-3">Press Inquiries</h2>
          <p className="text-gray-600 mb-4">For media inquiries, interview requests, or press materials, please contact:</p>
          <p className="font-medium text-purple-600">press@vaulttcgmarket.com</p>
        </div>

        <h2 className="text-xl font-semibold mb-6">Brand Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {['Logo Pack', 'Brand Guidelines', 'Screenshots', 'Press Kit'].map((resource) => (
            <div key={resource} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              <span className="font-medium text-sm">{resource}</span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-6">Press Releases</h2>
        <div className="space-y-4">
          {[
            { date: 'March 2024', title: 'Vault TCG Market Launches Premium Collector Features' },
            { date: 'January 2024', title: 'Vault TCG Market Reaches 100K Registered Users' },
            { date: 'October 2023', title: 'Vault TCG Market Secures Series A Funding' },
          ].map((release) => (
            <div key={release.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-400 mb-1">{release.date}</p>
              <p className="font-medium">{release.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
