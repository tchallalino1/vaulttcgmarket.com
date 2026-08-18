import Link from 'next/link';

export const metadata = {
  title: 'Returns & Refunds — Vault TCG Market',
  description: 'Learn about our return policy and refund process.',
};

export default function ReturnsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Returns & Refunds</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">RETURNS & REFUNDS</h1>
      <p className="text-gray-500 mb-10 max-w-2xl">We want you to be completely satisfied with your purchase. If something isn&apos;t right, we&apos;re here to help.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">14-Day Return Policy</h2>
            <p className="text-gray-600 mb-4">You may return most items within 14 days of delivery for a full refund or exchange, provided they meet the following conditions:</p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> Item is in its original condition</li>
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> Card is not damaged, altered, or removed from protective packaging</li>
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> Graded cards are returned in original case</li>
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> Sealed products remain factory sealed</li>
              <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> All original packaging and documentation included</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">How to Start a Return</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Contact Us', desc: 'Email support@vaulttcgmarket.com with your order number and reason for return.' },
                { step: '2', title: 'Get Authorization', desc: 'We\'ll provide a Return Merchandise Authorization (RMA) number within 24 hours.' },
                { step: '3', title: 'Ship the Item', desc: 'Pack the item securely and ship it using the prepaid label we provide.' },
                { step: '4', title: 'Receive Refund', desc: 'Once we receive and inspect the item, your refund will be processed within 3-5 business days.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Refund Timeline</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Credit Card</span><span className="font-medium">3-5 business days</span></div>
              <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">PayPal</span><span className="font-medium">1-2 business days</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-600">Store Credit</span><span className="font-medium">Immediate</span></div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Non-Returnable Items</h2>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex gap-2"><span className="text-red-500 font-bold">•</span> Items returned after 14 days</li>
              <li className="flex gap-2"><span className="text-red-500 font-bold">•</span> Cards that have been removed from sleeves or cases</li>
              <li className="flex gap-2"><span className="text-red-500 font-bold">•</span> Damaged or altered items</li>
              <li className="flex gap-2"><span className="text-red-500 font-bold">•</span> Items without original packaging</li>
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">Our support team is available to assist with returns and refunds.</p>
            <Link href="/contact" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">Contact Support →</Link>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping" className="text-purple-600 hover:text-purple-700">Shipping Information</Link></li>
              <li><Link href="/help" className="text-purple-600 hover:text-purple-700">Help Center</Link></li>
              <li><Link href="/contact" className="text-purple-600 hover:text-purple-700">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
