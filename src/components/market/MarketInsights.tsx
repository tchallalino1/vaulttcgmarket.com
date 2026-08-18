import Link from 'next/link';

const panels = [
  {
    title: 'MARKET INSIGHTS',
    description: 'Real-time price trends and analytics.',
    cta: 'EXPLORE MARKET',
    href: '/market',
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="24" height="24" rx="3" className="text-purple-200" fill="currentColor" />
        <polyline points="8,24 13,16 18,20 24,10" className="text-purple-600" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="10" r="2" className="text-purple-600" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'SELL YOUR CARDS',
    description: 'List your cards and reach thousands of buyers.',
    cta: 'START SELLING',
    href: '/sell',
    color: 'red',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="14" width="20" height="14" rx="2" className="text-red-200" fill="currentColor" />
        <path d="M16 24V10M16 10L10 16M16 10L22 16" className="text-red-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 10H22" className="text-red-400" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'VAULT ACCESS',
    description: 'Exclusive drops & premium inventory.',
    cta: 'JOIN VAULT',
    href: '/vault',
    color: 'amber',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4L28 10V18C28 23.5 22.5 28 16 28C9.5 28 4 23.5 4 18V10L16 4Z" className="text-amber-200" fill="currentColor" />
        <path d="M16 4L28 10V18C28 23.5 22.5 28 16 28C9.5 28 4 23.5 4 18V10L16 4Z" className="text-amber-500" fill="none" strokeWidth="1.5" />
        <path d="M12 16L15 19L21 13" className="text-amber-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const colorStyles: Record<string, { bg: string; border: string; iconBg: string; ctaBorder: string; ctaHover: string; ctaText: string }> = {
  purple: {
    bg: 'bg-white',
    border: 'border-gray-200',
    iconBg: 'bg-purple-100',
    ctaBorder: 'border-purple-300',
    ctaHover: 'hover:bg-purple-50',
    ctaText: 'text-purple-600',
  },
  red: {
    bg: 'bg-white',
    border: 'border-gray-200',
    iconBg: 'bg-red-100',
    ctaBorder: 'border-red-300',
    ctaHover: 'hover:bg-red-50',
    ctaText: 'text-red-600',
  },
  amber: {
    bg: 'bg-white',
    border: 'border-gray-200',
    iconBg: 'bg-amber-100',
    ctaBorder: 'border-amber-300',
    ctaHover: 'hover:bg-amber-50',
    ctaText: 'text-amber-600',
  },
};

export function MarketInsights() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {panels.map((panel) => {
          const styles = colorStyles[panel.color];
          return (
            <div
              key={panel.title}
              className={`${styles.bg} border ${styles.border} rounded-2xl p-6 flex flex-col items-start hover:shadow-md transition-shadow`}
            >
              <div className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mb-4`}>
                {panel.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{panel.title}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">{panel.description}</p>
              <Link
                href={panel.href}
                className={`inline-flex items-center gap-2 px-4 py-2 border ${styles.ctaBorder} rounded-lg text-sm font-medium ${styles.ctaText} ${styles.ctaHover} transition-colors`}
              >
                {panel.cta}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
