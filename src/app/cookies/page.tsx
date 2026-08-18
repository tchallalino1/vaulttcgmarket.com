import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy — Vault TCG Market',
  description: 'How we use cookies on Vault TCG Market.',
};

export default function CookiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Cookie Policy</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">COOKIE POLICY</h1>
      <p className="text-gray-500 mb-10">Last updated: January 1, 2024</p>

      <div className="max-w-3xl space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">What Are Cookies</h2>
          <p className="text-gray-600 leading-relaxed">Cookies are small text files stored on your device when you visit our website. They help us provide a better experience.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Types of Cookies We Use</h2>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium">Essential Cookies</h3>
              <p className="text-sm text-gray-600">Required for the site to function. Cannot be disabled.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium">Analytics Cookies</h3>
              <p className="text-sm text-gray-600">Help us understand how visitors use our site.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium">Marketing Cookies</h3>
              <p className="text-sm text-gray-600">Used to deliver relevant advertisements.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Managing Cookies</h2>
          <p className="text-gray-600 leading-relaxed">You can control cookies through your browser settings. Note that disabling essential cookies may affect site functionality.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-600 leading-relaxed">Questions about cookies? Contact <Link href="/contact" className="text-purple-600 hover:text-purple-700">support@vaulttcgmarket.com</Link>.</p>
        </section>
      </div>
    </div>
  );
}
