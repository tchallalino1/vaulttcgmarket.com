import Link from 'next/link';

export const metadata = {
  title: 'My Account — Vault TCG Market',
  description: 'Manage your account, orders, and preferences.',
};

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">MY ACCOUNT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign In</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="signin-password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Sign In
            </button>
            <div className="flex items-center justify-between text-sm">
              <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </Link>
              <span className="text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Create one
                </Link>
              </span>
            </div>
          </form>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create Account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label htmlFor="register-confirm" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="register-confirm"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Or continue as guest</h2>
          <p className="text-gray-500 text-sm">
            You can browse and add items to your cart without an account.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <svg className="w-8 h-8 mx-auto text-purple-600 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">Order Tracking</h3>
            <p className="text-xs text-gray-500">Track your orders in real-time</p>
          </div>
          <div className="text-center p-4">
            <svg className="w-8 h-8 mx-auto text-purple-600 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">Wishlist</h3>
            <p className="text-xs text-gray-500">Save cards you love for later</p>
          </div>
          <div className="text-center p-4">
            <svg className="w-8 h-8 mx-auto text-purple-600 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">Faster Checkout</h3>
            <p className="text-xs text-gray-500">Save your info for quick checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
