interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  priceChange?: number;
  priceChangePercent?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const sizeClasses: Record<string, { price: string; compare: string; change: string }> = {
  sm: {
    price: 'text-lg font-bold',
    compare: 'text-xs',
    change: 'text-xs',
  },
  md: {
    price: 'text-2xl font-bold',
    compare: 'text-sm',
    change: 'text-sm',
  },
  lg: {
    price: 'text-3xl font-bold',
    compare: 'text-base',
    change: 'text-base',
  },
};

export function PriceDisplay({
  price,
  compareAtPrice,
  priceChangePercent,
  currency = 'USD',
  size = 'md',
}: PriceDisplayProps) {
  const styles = sizeClasses[size];
  const hasDiscount = compareAtPrice != null && compareAtPrice > price;
  const hasChange = priceChangePercent != null && priceChangePercent !== 0;
  const isUp = (priceChangePercent ?? 0) > 0;

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2">
        <span className={styles.price}>{formatCurrency(price, currency)}</span>
        {hasDiscount && (
          <span className={`${styles.compare} text-gray-400 line-through`}>
            {formatCurrency(compareAtPrice!, currency)}
          </span>
        )}
      </div>
      {hasChange && (
        <div
          className={`flex items-center gap-1 ${styles.change} ${
            isUp ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <span>{isUp ? '↑' : '↓'}</span>
          <span>{Math.abs(priceChangePercent!).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}
