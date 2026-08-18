import Link from 'next/link';

export const metadata = {
  title: 'Wishlist — Vault TCG Market',
  description: 'Your saved Pokémon cards and collectibles.',
};

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">WISHLIST</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Save cards you love to your wishlist for later.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pokemon"
            className="inline-flex items-center justify-center bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            BROWSE PRODUCTS
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center justify-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
