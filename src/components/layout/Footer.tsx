import Link from 'next/link';

const SHOP_LINKS = [
  { label: 'Pokémon', href: '/pokemon' },
  { label: 'Graded Cards', href: '/graded' },
  { label: 'Sealed Products', href: '/sealed' },
  { label: 'Vintage', href: '/vintage' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Deals', href: '/deals' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Sell on Vault', href: '/sell' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', href: '/help' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping Info', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'FAQs', href: '/faqs' },
];

const LEGAL_LINKS = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & description */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex">
              <img src="/images/logo.svg" alt="Vault TCG Market" className="h-9 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Your trusted marketplace for authentic Pokémon cards, graded collectibles, sealed products, and more.
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                +1 (385) 201-3024
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                Provo, Utah
              </p>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
            <ul className="mt-4 space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="mt-4 space-y-2">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; 2024 Vault TCG Market. All rights reserved.
            </p>

            {/* Payment icons */}
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-black flex items-center gap-1"><svg viewBox="0 0 24 24" className="w-3 h-3"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="17" textAnchor="middle" fontSize="12" fill="white">A</text></svg> Pay</span>
              <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-[#00D632] flex items-center gap-1"><svg viewBox="0 0 24 24" className="w-3 h-3"><rect width="24" height="24" rx="4" fill="#00D632"/><text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">$</text></svg> Cash App</span>
              <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-[#F7931A] flex items-center gap-1"><svg viewBox="0 0 24 24" className="w-3 h-3"><rect width="24" height="24" rx="12" fill="#F7931A"/><text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">₿</text></svg> Bitcoin</span>
              <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-[#003087] flex items-center gap-1"><svg viewBox="0 0 24 24" className="w-3 h-3"><rect width="24" height="24" rx="4" fill="#003087"/><text x="12" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#009CDE">PP</text></svg> PayPal</span>
              <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-[#6D1ED4] flex items-center gap-1"><svg viewBox="0 0 24 24" className="w-3 h-3"><rect width="24" height="24" rx="4" fill="#6D1ED4"/><text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Z</text></svg> Zelle</span>
              <span className="rounded border border-gray-700 bg-white px-2 py-0.5 text-xs font-bold text-blue-900">Chime</span>
              <span className="rounded border border-gray-700 bg-white px-2 py-0.5 text-xs font-bold text-green-800">Wise</span>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
