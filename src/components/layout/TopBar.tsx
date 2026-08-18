export function TopBar() {
  return (
    <div className="bg-gray-950 text-gray-300 hidden md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              100% Authentic Cards
            </span>
            <span className="h-3 w-px bg-gray-700" />
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </span>
            <span className="h-3 w-px bg-gray-700" />
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Worldwide Shipping
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/track-order" className="hover:text-white transition-colors">Track Order</a>
            <span className="h-3 w-px bg-gray-700" />
            <a href="/help" className="hover:text-white transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
}
