const trustItems = [
  {
    title: 'AUTHENTICITY GUARANTEED',
    description: 'Every card is verified by our experts.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L20 6V12C20 17.5 16.5 22 12 22C7.5 22 4 17.5 4 12V6L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'WORLDWIDE SHIPPING',
    description: 'Fast & insured delivery to your doorstep.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12H22" />
        <path d="M12 2C14.5 4.73 16 8.24 16 12C16 15.76 14.5 19.27 12 22C9.5 19.27 8 15.76 8 12C8 8.24 9.5 4.73 12 2Z" />
      </svg>
    ),
  },
  {
    title: 'SECURE PAYMENTS',
    description: 'Safe & encrypted checkout.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'COLLECTOR SUPPORT',
    description: "We're here to help every step of the way.",
    icon: (
      <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18V12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12V18" />
        <path d="M21 19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V18H21V19Z" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <path d="M9 10C9 10 10.5 9 12 9C13.5 9 15 10 15 10" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function TrustSection() {
  return (
    <section className="w-full border-t border-gray-200 pt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {trustItems.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
