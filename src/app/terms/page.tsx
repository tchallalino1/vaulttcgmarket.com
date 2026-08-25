import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Vault TCG Market',
  description: 'Terms and conditions for using Vault TCG Market.',
};

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Terms of Service</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">TERMS OF SERVICE</h1>
      <p className="text-gray-500 mb-10">Last updated: January 1, 2024</p>

      <div className="max-w-3xl space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">By accessing or using Vault TCG Market (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Accounts</h2>
          <p className="text-gray-600 leading-relaxed">You must provide accurate, complete information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Buying</h2>
          <p className="text-gray-600 leading-relaxed">When you purchase an item, you agree to pay the listed price plus applicable taxes and shipping. All sales are subject to our authentication process. We reserve the right to cancel orders for suspected fraudulent activity.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Selling</h2>
          <p className="text-gray-600 leading-relaxed">Sellers must accurately describe all items and provide clear photographs. Listing counterfeit or misrepresented items will result in account termination. Sellers are responsible for proper packaging and timely shipment.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Payments</h2>
          <p className="text-gray-600 leading-relaxed">We accept Cash App, Bitcoin, Ethereum, and Zelle as displayed at checkout. All payments are processed securely. Vault TCG Market holds payment until the buyer confirms receipt.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Shipping</h2>
          <p className="text-gray-600 leading-relaxed">Sellers are responsible for shipping items within the specified timeframe. We provide shipping labels for insured delivery. See our Shipping Information page for details.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Returns</h2>
          <p className="text-gray-600 leading-relaxed">Items may be returned within 14 days of delivery if they do not match the listing description. See our Returns & Refunds page for the full policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">All content on this Platform, including logos, text, and graphics, is the property of Vault TCG Market or its licensors. You may not reproduce or distribute any content without written permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">Vault TCG Market is not liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the transaction in question.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
          <p className="text-gray-600 leading-relaxed">Questions about these Terms? Contact us at <Link href="/contact" className="text-purple-600 hover:text-purple-700">support@vaulttcgmarket.com</Link>.</p>
        </section>
      </div>
    </div>
  );
}
