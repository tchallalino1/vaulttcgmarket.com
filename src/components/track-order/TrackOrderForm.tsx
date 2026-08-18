'use client';

import { useState } from 'react';

export function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber && email) {
      setSubmitted(true);
    }
  };

  const steps = [
    { label: 'Confirmed', completed: submitted },
    { label: 'Processing', completed: submitted },
    { label: 'Shipped', completed: false },
    { label: 'In Transit', completed: false },
    { label: 'Delivered', completed: false },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-10">
        <div className="space-y-4">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
            <input
              id="orderNumber"
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. VTM-2024-00123"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors text-sm"
        >
          TRACK ORDER
        </button>
      </form>

      {/* Demo Tracking Timeline */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        <h2 className="font-semibold mb-6">Order Status</h2>
        <div className="relative">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 pb-8 last:pb-0 relative">
              {i < steps.length - 1 && (
                <div
                  className={`absolute left-[15px] top-[32px] w-0.5 h-full ${
                    step.completed ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <span className="text-xs font-medium">{i + 1}</span>
                )}
              </div>
              <div className="pt-0.5">
                <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                {step.completed && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {i === 0 && 'Order confirmed successfully'}
                    {i === 1 && 'Your order is being prepared'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {!submitted && (
          <p className="text-sm text-gray-400 mt-4 text-center">Enter your order details above to track your shipment</p>
        )}
      </div>
    </>
  );
}
