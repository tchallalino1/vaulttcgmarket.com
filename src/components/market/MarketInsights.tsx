'use client';
import Link from 'next/link';

const panels = [
  {
    title: 'MARKET INSIGHTS',
    description: 'Real-time price trends, market data and powerful analytics to help you collect smarter.',
    cta: 'EXPLORE MARKET',
    href: '/market',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    statIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 5-8" /></svg>
    ),
    statLabel: 'Live Market Updates',
    statValue: '24/7',
    gradient: 'from-[#1a1035] via-[#150d28] to-[#0d0a1a]',
    accentColor: 'text-purple-400',
    accentBg: 'bg-purple-500/20',
    ctaBg: 'bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30',
    ctaText: 'text-purple-300',
    statValueColor: 'text-purple-400',
    cardGradients: ['from-purple-600 to-indigo-700', 'from-blue-500 to-purple-600', 'from-violet-500 to-purple-700'],
  },
  {
    title: 'SELL YOUR CARDS',
    description: 'List your cards in minutes and reach thousands of serious collectors worldwide.',
    cta: 'START SELLING',
    href: '/sell',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    ),
    statIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    statLabel: 'Active Buyers',
    statValue: '50K+',
    gradient: 'from-[#1a0d0d] via-[#1f0a0a] to-[#0d0a0a]',
    accentColor: 'text-red-400',
    accentBg: 'bg-red-500/20',
    ctaBg: 'bg-red-600/20 border border-red-500/40 hover:bg-red-600/30',
    ctaText: 'text-red-300',
    statValueColor: 'text-red-400',
    cardGradients: ['from-red-500 to-orange-600', 'from-red-600 to-pink-600', 'from-orange-500 to-red-600'],
  },
  {
    title: 'VAULT ACCESS',
    description: 'Exclusive drops, limited releases and premium inventory you won\'t find anywhere else.',
    cta: 'JOIN VAULT',
    href: '/vault',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    statIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
    statLabel: 'Exclusive Benefits',
    statValue: 'Members Only',
    gradient: 'from-[#1a1a0d] via-[#1a1508] to-[#0d0d0a]',
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-500/20',
    ctaBg: 'bg-amber-600/20 border border-amber-500/40 hover:bg-amber-600/30',
    ctaText: 'text-amber-300',
    statValueColor: 'text-amber-400',
    cardGradients: ['from-amber-500 to-yellow-600', 'from-amber-600 to-orange-600', 'from-yellow-500 to-amber-600'],
  },
];

export function MarketInsights() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {panels.map((panel) => (
          <div
            key={panel.title}
            className={`relative bg-gradient-to-br ${panel.gradient} rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1 border border-white/[0.05]`}
          >
            {/* Background card imagery */}
            <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden opacity-40 group-hover:opacity-50 transition-opacity">
              <div className="absolute top-4 right-4 w-[90px] h-[126px] rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rotate-6 shadow-xl" />
              <div className="absolute top-8 right-14 w-[90px] h-[126px] rounded-lg bg-gradient-to-br from-white/15 to-white/5 border border-white/10 -rotate-3 shadow-xl" />
              <div className="absolute bottom-12 right-2 w-[80px] h-[112px] rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rotate-12 shadow-xl" />
              {/* Decorative card art shapes */}
              <div className={`absolute top-10 right-8 w-[80px] h-[110px] rounded-lg bg-gradient-to-br ${panel.cardGradients[0]} opacity-30 rotate-6 shadow-2xl`} />
              <div className={`absolute top-14 right-20 w-[80px] h-[110px] rounded-lg bg-gradient-to-br ${panel.cardGradients[1]} opacity-25 -rotate-3 shadow-2xl`} />
              <div className={`absolute bottom-16 right-6 w-[70px] h-[98px] rounded-lg bg-gradient-to-br ${panel.cardGradients[2]} opacity-20 rotate-12 shadow-2xl`} />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 pb-0 flex flex-col min-h-[260px]">
              {/* Icon */}
              <div className={`w-11 h-11 ${panel.accentBg} rounded-xl flex items-center justify-center mb-5 ${panel.accentColor}`}>
                {panel.icon}
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{panel.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-[260px]">{panel.description}</p>

              {/* CTA */}
              <Link
                href={panel.href}
                className={`inline-flex items-center gap-2 px-5 py-2.5 ${panel.ctaBg} rounded-lg text-sm font-semibold ${panel.ctaText} transition-all w-fit backdrop-blur-sm`}
              >
                {panel.cta}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Bottom stat bar */}
            <div className="relative z-10 mt-auto border-t border-white/[0.06] px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={panel.accentColor}>{panel.statIcon}</span>
                <span className="text-xs text-gray-400 font-medium">{panel.statLabel}</span>
              </div>
              <span className={`text-xs font-bold ${panel.statValueColor}`}>{panel.statValue}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
