import Link from 'next/link';

export const metadata = {
  title: 'Shipping Information — Vault TCG Market',
  description: 'Learn about our shipping methods, processing times, international shipping, and card packaging standards.',
};

export default function ShippingPage() {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      price: '$4.99',
      time: '5-7 business days',
      description: 'Reliable delivery for everyday orders. Includes tracking and basic insurance up to $50.',
    },
    {
      name: 'Express Shipping',
      price: '$9.99',
      time: '2-3 business days',
      description: 'Faster delivery when you need it. Includes tracking and insurance up to $200.',
    },
    {
      name: 'Overnight Shipping',
      price: '$19.99',
      time: '1 business day',
      description: 'Next-day delivery for urgent orders. Includes tracking and insurance up to $500.',
    },
  ];

  const packagingSteps = [
    {
      step: 1,
      title: 'Penny Sleeve',
      description: 'Every card is first placed in an archival-quality penny sleeve to prevent surface scratches.',
    },
    {
      step: 2,
      title: 'Top Loader or Semi-Rigid Holder',
      description: 'Sleeved cards are secured in a rigid holder to prevent bending during transit.',
    },
    {
      step: 3,
      title: 'Team Bag Seal',
      description: 'Cards are sealed in a resealable team bag to keep out dust and moisture.',
    },
    {
      step: 4,
      title: 'Bubble Mailer',
      description: 'Orders are shipped in padded bubble mailers or rigid mailers for maximum protection.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0517] via-[#1a0a2e] to-[#0a0a1a] rounded-2xl py-12 mb-12">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-medium mb-3">✦ Shipping</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">SHIPPING INFORMATION</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Everything you need to know about how we get your cards safely to your door.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto">
        {/* Shipping Methods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Shipping Methods</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {shippingMethods.map((method) => (
              <div key={method.name} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-1">{method.name}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-1">{method.price}</p>
                <p className="text-sm text-gray-500 mb-3">{method.time}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Free Shipping */}
        <section className="mb-16 bg-purple-50 border border-purple-100 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Free Standard Shipping</h2>
          <p className="text-gray-600 mb-4">
            Enjoy free standard shipping on all domestic orders over <span className="font-semibold text-purple-700">$75</span>. No promo code needed — it is automatically applied at checkout.
          </p>
          <Link href="/products" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-6 py-2.5 transition-colors text-sm">
            BROWSE PRODUCTS
          </Link>
        </section>

        {/* Processing Times */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Processing Times</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold mb-2">Order Processing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Orders are processed within 1-2 business days. Orders placed before 2:00 PM EST on business days are typically processed the same day. Weekend and holiday orders will be processed on the next business day.
              </p>
            </div>
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold mb-2">Verification</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                High-value orders (over $100) may require additional verification. This can add 1-2 business days to processing time. We may contact you by email or phone to verify your order.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-semibold mb-2">Tracking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                A shipping confirmation email with tracking information is sent once your order has been shipped. You can also track your order through your account dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* International Shipping */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">International Shipping</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Available Countries</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We ship to over 50 countries worldwide. International shipping rates are calculated at checkout based on destination and package weight.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Delivery Time</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                International orders typically arrive within 7-21 business days depending on the destination country and customs processing times.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Customs & Duties</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                International customers are responsible for any customs duties, taxes, or import fees imposed by their country. Vault TCG Market is not responsible for delays caused by customs clearance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Insurance</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                International orders include basic insurance up to $100. Additional insurance can be purchased at checkout for high-value orders.
              </p>
            </div>
          </div>
        </section>

        {/* Packaging Standards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Card Packaging Standards</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            We take card protection seriously. Every card shipped from Vault TCG Market goes through our multi-step packaging process to ensure it arrives in perfect condition.
          </p>
          <div className="space-y-4">
            {packagingSteps.map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Shipping Insurance</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Included Coverage</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                All domestic shipments include basic insurance covering loss or damage up to the value listed for each shipping method. If your order arrives damaged, contact us within 48 hours with photos of the damage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Additional Insurance</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                For orders valued over $500, we strongly recommend purchasing additional shipping insurance. This can be added during checkout for a small fee based on the order value.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Filing a Claim</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                To file an insurance claim, contact our support team at <span className="text-purple-600">support@vaulttcgmarket.com</span> with your order number, photos of any damage, and a description of the issue. Claims are typically resolved within 3-5 business days.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Questions About Shipping?</h2>
          <p className="text-gray-500 mb-5">Our support team is here to help with any shipping-related questions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-6 py-2.5 transition-colors text-sm">
              CONTACT US
            </Link>
            <Link href="/help" className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg px-6 py-2.5 transition-colors text-sm">
              HELP CENTER
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
