'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

const NAV_LINKS = [
  { label: 'Pokémon', href: '/pokemon', hasDropdown: true },
  { label: 'Graded', href: '/graded' },
  { label: 'Sealed', href: '/sealed' },
  { label: 'Vintage', href: '/vintage' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Deals', href: '/deals' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 lg:hidden hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <img src="/images/logo.svg" alt="Vault TCG Market" className="h-9 w-auto" />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-purple-600 ${
                  pathname === link.href
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search cards, sets, or Pokémon..."
                className="block w-full rounded-full border-0 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-red-500"
            >
              <span className="sr-only">Wishlist</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-purple-600 sm:block"
            >
              <span className="sr-only">Account</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-purple-600"
            >
              <span className="sr-only">Cart</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 lg:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search cards, sets, or Pokémon..."
              className="block w-full rounded-full border-0 bg-gray-100 py-1.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl">
            <div className="flex h-full flex-col overflow-y-auto">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                <img src="/images/logo.svg" alt="Vault TCG Market" className="h-8 w-auto" />
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search in mobile menu */}
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search cards, sets, or Pokémon..."
                    className="block w-full rounded-full border-0 bg-gray-100 py-1.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 px-3 py-4">
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${
                        pathname === link.href
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-700'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Bottom actions */}
              <div className="border-t border-gray-200 px-3 py-4">
                <div className="space-y-1">
                  <Link
                    href="/account"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Account
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    Wishlist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
