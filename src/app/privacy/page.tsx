import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Vault TCG Market',
  description: 'How we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">PRIVACY POLICY</h1>
      <p className="text-gray-500 mb-10">Last updated: January 1, 2024</p>

      <div className="max-w-3xl space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-2">We collect information you provide directly:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Account information (name, email, password)</li>
            <li>Payment information (processed securely via our payment providers)</li>
            <li>Shipping addresses</li>
            <li>Communications with us</li>
            <li>Product listings and transaction history</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>To provide and improve our services</li>
            <li>To process transactions</li>
            <li>To send order updates and notifications</li>
            <li>To detect and prevent fraud</li>
            <li>To communicate with you about your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed">We do not sell your personal information. We share data only with payment processors, shipping carriers, and as required by law.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p className="text-gray-600 leading-relaxed">We implement industry-standard security measures including encryption, secure servers, and regular security audits.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-600 leading-relaxed">Privacy questions? Contact us at <Link href="/contact" className="text-purple-600 hover:text-purple-700">privacy@vaulttcgmarket.com</Link>.</p>
        </section>
      </div>
    </div>
  );
}
