'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

export default function CheckoutContent() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shippingInfo, setShippingInfo] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'US' });
  const [paymentInfo, setPaymentInfo] = useState({ method: 'cashapp', cashTag: '', walletAddress: '' });
  const [orderNumber, setOrderNumber] = useState('');

  const handleShippingSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep('payment'); };
  const handlePaymentSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep('review'); };
  const handlePlaceOrder = async () => {
    const orderNum = `VLT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setOrderNumber(orderNum);

    // Send confirmation email
    try {
      await fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: orderNum,
          customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          customerEmail: shippingInfo.email,
          items: items.map(item => ({ name: item.product.name, price: item.product.price, quantity: item.quantity })),
          subtotal,
          shipping,
          total,
          shippingAddress: shippingInfo,
        }),
      });
    } catch {}

    clearCart();
    setStep('confirmation');
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">CHECKOUT</h1>
        <p className="text-gray-500 mb-6">Your cart is empty. Add some items before checking out.</p>
        <Link href="/pokemon" className="inline-flex items-center bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors">BROWSE PRODUCTS</Link>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">ORDER CONFIRMED!</h1>
        <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
        <p className="text-sm text-gray-400 mb-8">Order #{orderNumber} — Confirmation sent to {shippingInfo.email || 'your email'}</p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold mb-3">What&apos;s Next</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3"><span className="text-purple-600 font-bold">1.</span><span>You&apos;ll receive an email confirmation shortly.</span></div>
            <div className="flex gap-3"><span className="text-purple-600 font-bold">2.</span><span>Your order will be processed within 1-2 business days.</span></div>
            <div className="flex gap-3"><span className="text-purple-600 font-bold">3.</span><span>Track your order from your account dashboard.</span></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="inline-flex items-center justify-center bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors">CONTINUE SHOPPING</Link>
          <Link href="/account" className="inline-flex items-center justify-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">VIEW ACCOUNT</Link>
        </div>
      </div>
    );
  }

  const steps = [
    { key: 'shipping', label: 'Shipping', num: 1 },
    { key: 'payment', label: 'Payment', num: 2 },
    { key: 'review', label: 'Review', num: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">CHECKOUT</h1>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step === s.key ? 'text-purple-600' : steps.findIndex(x => x.key === step) > i ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s.key ? 'bg-purple-600 text-white' : steps.findIndex(x => x.key === step) > i ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>{steps.findIndex(x => x.key === step) > i ? '✓' : s.num}</div>
              <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`w-12 h-0.5 ${steps.findIndex(x => x.key === step) > i ? 'bg-green-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">SHIPPING INFORMATION</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label><input required type="text" value={shippingInfo.firstName} onChange={e => setShippingInfo(p => ({...p, firstName: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label><input required type="text" value={shippingInfo.lastName} onChange={e => setShippingInfo(p => ({...p, lastName: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
              </div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input required type="email" value={shippingInfo.email} onChange={e => setShippingInfo(p => ({...p, email: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={shippingInfo.phone} onChange={e => setShippingInfo(p => ({...p, phone: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Address *</label><input required type="text" value={shippingInfo.address} onChange={e => setShippingInfo(p => ({...p, address: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">City *</label><input required type="text" value={shippingInfo.city} onChange={e => setShippingInfo(p => ({...p, city: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">State *</label><input required type="text" value={shippingInfo.state} onChange={e => setShippingInfo(p => ({...p, state: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">ZIP *</label><input required type="text" value={shippingInfo.zip} onChange={e => setShippingInfo(p => ({...p, zip: e.target.value}))} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors">CONTINUE TO PAYMENT</button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'btc', label: 'Bitcoin', color: 'bg-orange-500' },
                  { id: 'eth', label: 'Ethereum', color: 'bg-blue-500' },
                  { id: 'cashapp', label: 'Cash App', color: 'bg-green-500' },
                  { id: 'zelle', label: 'Zelle', color: 'bg-purple-500' },
                ].map(m => (
                  <button key={m.id} type="button" onClick={() => setPaymentInfo(p => ({...p, method: m.id}))} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${paymentInfo.method === m.id ? 'border-purple-500 bg-purple-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {{ btc: '₿', eth: 'Ξ', cashapp: '$', zelle: 'Z' }[m.id]}
                    </div>
                    <span className="text-gray-800">{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Order Notes (Optional)</label>
                <textarea placeholder="Any special instructions for your order..." rows={3} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none" />
              </div>

              <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                Place Order
              </button>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm mb-1">Payment Instructions</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">After placing your order, Vault TCG Market will contact you with payment instructions. You will receive an email confirmation and order number immediately.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button type="button" onClick={() => setStep('shipping')} className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">Back to Shipping</button>
              </div>
            </form>
          )}

          {step === 'review' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">REVIEW ORDER</h2>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2"><span className="text-sm font-semibold">Shipping to</span><button type="button" onClick={() => setStep('shipping')} className="text-xs text-purple-600 hover:text-purple-700">Edit</button></div>
                  <p className="text-sm text-gray-600">{shippingInfo.firstName} {shippingInfo.lastName}<br/>{shippingInfo.address}<br/>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2"><span className="text-sm font-semibold">Payment</span><button type="button" onClick={() => setStep('payment')} className="text-xs text-purple-600 hover:text-purple-700">Edit</button></div>
                  <p className="text-sm text-gray-600">{{ cashapp: 'Cash App ($VaultTCGMarket)', btc: 'Bitcoin (BTC)', eth: 'Ethereum (ETH)', zelle: 'Zelle' }[paymentInfo.method] || paymentInfo.method}</p>
                </div>
              </div>
              <h3 className="font-semibold text-sm mb-3">ORDER ITEMS</h3>
              <div className="space-y-3 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="w-12 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0 relative">
                      {product.pokemonTcgCardId ? <Image src={getCardImageUrl(product.pokemonTcgCardId, 'small')} alt={product.name} fill className="object-contain" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-sm">🃏</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('payment')} className="flex-1 border border-gray-300 text-gray-700 py-3.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">BACK</button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-purple-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-purple-700 transition-colors">PLACE ORDER — ${total.toFixed(2)}</button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">Order Summary</h2>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0 relative">
                    {product.pokemonTcgCardId ? <Image src={getCardImageUrl(product.pokemonTcgCardId, 'small')} alt={product.name} fill className="object-contain" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-xs">🃏</div>}
                  </div>
                  <span className="flex-1 line-clamp-1 text-gray-600">{product.name} × {quantity}</span>
                  <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span className="font-medium">{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              <div className="border-t pt-2 flex justify-between"><span className="font-bold">Total</span><span className="font-bold text-lg">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
