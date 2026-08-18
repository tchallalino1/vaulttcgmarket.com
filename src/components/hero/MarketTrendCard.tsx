'use client';
import { getMarketTrend } from '@/lib/market';

export function MarketTrendCard() {
  const trend = getMarketTrend();

  const min = Math.min(...trend.data);
  const max = Math.max(...trend.data);
  const range = max - min || 1;
  const width = 140;
  const height = 48;
  const padding = 4;

  const points = trend.data.map((value, i) => {
    const x = padding + (i / (trend.data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `${linePath} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <div className="w-[220px] bg-white rounded-xl shadow-lg shadow-black/10 p-4">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-1">
        Market Trend
      </p>
      <p className="text-sm font-medium text-gray-900 truncate">{trend.name}</p>
      <div className="flex items-baseline justify-between mt-1">
        <span className="text-xl font-bold text-gray-900">
          ${trend.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        <span className="text-sm font-semibold text-emerald-500">
          ↑ {trend.priceChangePercent}%
        </span>
      </div>

      {/* Mini chart */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-12 mt-3"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartGrad)" />
        <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <p className="text-[10px] text-gray-400 mt-1">{trend.period}</p>
    </div>
  );
}
