import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/products/ProductCard';
import { getCardImageUrl } from '@/lib/pokemon-tcg/images';
import { AddToCartSection } from '@/components/products/AddToCartSection';

const productTypeLabels: Record<string, string> = {
  single: 'Raw',
  graded: 'Graded',
  sealed: 'Sealed',
  vintage: 'Vintage',
  accessory: 'Accessory',
};

const productTypeBadgeVariant: Record<string, 'info' | 'success' | 'purple' | 'warning'> = {
  single: 'purple',
  graded: 'info',
  sealed: 'success',
  vintage: 'warning',
  accessory: 'default' as 'purple',
};

const pokemonGradients: Record<string, string> = {
  Charizard: 'from-orange-500 via-red-500 to-orange-600',
  Pikachu: 'from-yellow-400 via-amber-400 to-yellow-500',
  Umbreon: 'from-indigo-900 via-gray-900 to-indigo-950',
  Gengar: 'from-purple-600 via-violet-700 to-indigo-900',
  Mewtwo: 'from-purple-500 via-violet-500 to-blue-600',
  Rayquaza: 'from-emerald-500 via-green-500 to-teal-600',
  Eevee: 'from-amber-500 via-orange-500 to-amber-600',
  Dragonite: 'from-orange-500 via-amber-500 to-orange-600',
};

function getGradient(pokemon?: string): string {
  if (!pokemon) return 'from-purple-500 via-violet-500 to-indigo-600';
  return pokemonGradients[pokemon] || 'from-purple-500 via-violet-500 to-indigo-600';
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);
  if (!product) return { title: 'Product Not Found — Vault TCG Market' };

  const title = product.gradingCompany && product.grade
    ? `${product.gradingCompany} ${product.grade} ${product.name}`
    : product.name;

  const description = [
    product.set && `From ${product.set}`,
    product.cardNumber && `Card #${product.cardNumber}`,
    product.rarity && `${product.rarity} rarity`,
    product.condition && product.condition,
    product.language && `${product.language} language`,
    product.pokemon && `Featuring ${product.pokemon}`,
  ]
    .filter(Boolean)
    .join(' · ');

  return {
    title: `${title} — Vault TCG Market`,
    description: description || product.description,
    openGraph: {
      title: `${title} — Vault TCG Market`,
      description: product.description,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product, 4);
  const inStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;
  const isGraded = product.productType === 'graded' && product.gradingCompany && product.grade;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <Link href="/products" className="hover:text-purple-600 transition-colors">Products</Link>
          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* LEFT COLUMN — Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${getGradient(product.pokemon)} overflow-hidden shadow-xl`}>
                {product.pokemonTcgCardId ? (
                  <img
                    src={getCardImageUrl(product.pokemonTcgCardId, 'large')}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                    <div className="mb-4 opacity-20">
                      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                        <rect x="2" y="2" width="20" height="20" rx="3" />
                        <circle cx="8.5" cy="8.5" r="2" />
                        <path d="M21 16l-5-5L5 21" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-center drop-shadow-lg leading-tight">
                      {product.name}
                    </p>
                    {product.cardNumber && (
                      <p className="text-white/60 text-sm mt-2 font-medium">{product.cardNumber}</p>
                    )}
                    {isGraded && (
                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl px-5 py-2">
                        <span className="text-xl font-bold">{product.gradingCompany} {product.grade}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Zoom icon overlay */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg cursor-pointer hover:bg-white transition-colors">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>

              {/* Trending badge */}
              {product.trending && (
                <div className="absolute top-4 left-4">
                  <Badge variant="error" size="md">Trending</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail navigation dots */}
            <div className="flex items-center justify-center gap-2 py-2">
              <button className="w-3 h-3 rounded-full bg-gray-900 ring-2 ring-gray-900 ring-offset-2" aria-label="Main image" />
              <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors" aria-label="Alternate view 1" />
              <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors" aria-label="Alternate view 2" />
              <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors" aria-label="Alternate view 3" />
            </div>
          </div>

          {/* RIGHT COLUMN — Product Info */}
          <div className="flex flex-col gap-5">
            {/* Type badge + trending */}
            <div className="flex items-center gap-2">
              <Badge variant={product.productType === 'graded' ? 'info' : product.productType === 'sealed' ? 'success' : 'purple'} size="md">
                {productTypeLabels[product.productType] || product.productType}
              </Badge>
              {product.rarity && (
                <Badge variant="default" size="md">{product.rarity}</Badge>
              )}
            </div>

            {/* Product name */}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Pokemon link */}
            {product.pokemon && (
              <Link
                href={`/pokemon/${product.pokemonSlug}`}
                className="inline-flex items-center gap-1.5 text-purple-600 hover:text-purple-700 font-medium transition-colors w-fit"
              >
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-xs">
                  {product.pokemon.charAt(0)}
                </span>
                {product.pokemon}
              </Link>
            )}

            {/* Set and card number */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              {product.set && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  {product.set}
                </span>
              )}
              {product.cardNumber && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="font-mono">{product.cardNumber}</span>
                </>
              )}
            </div>

            {/* Grading info section */}
            {isGraded && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Grading</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {product.gradingCompany} {product.grade}
                      </span>
                      {product.grade === '10' && (
                        <span className="text-xs font-bold text-amber-600 bg-amber-100 rounded-full px-2 py-0.5">GEM MINT</span>
                      )}
                      {product.grade === '9.5' && (
                        <span className="text-xs font-bold text-amber-600 bg-amber-100 rounded-full px-2 py-0.5">GEM MINT</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-0.5">Certification</p>
                    <p className="font-mono text-sm font-semibold text-gray-700">
                      {product.certificationNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Price section */}
            <div className="border-t border-b border-gray-200 py-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {formatCurrency(product.price, product.currency)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {formatCurrency(product.compareAtPrice!, product.currency)}
                    </span>
                    <span className="text-sm font-bold text-green-600 bg-green-100 rounded-full px-2.5 py-0.5">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {product.priceChangePercent != null && product.priceChangePercent !== 0 && (
                <div className={`flex items-center gap-1.5 text-sm font-medium ${
                  product.priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span>{product.priceChangePercent > 0 ? '↑' : '↓'}</span>
                  <span>{Math.abs(product.priceChangePercent).toFixed(1)}% this week</span>
                </div>
              )}

              {/* Stock status */}
              <div className="mt-3">
                {inStock ? (
                  <div className={`flex items-center gap-2 text-sm font-medium ${
                    isLowStock ? 'text-amber-600' : 'text-green-600'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-amber-500' : 'bg-green-500'}`} />
                    {isLowStock ? `Low Stock — ${product.stock} left` : `In Stock (${product.stock} available)`}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <AddToCartSection
              product={product}
              inStock={inStock}
              isLowStock={isLowStock}
              hasDiscount={hasDiscount}
              discountPercent={discountPercent}
            />

            {/* Seller info */}
            {product.seller && (
              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900">{product.seller.name}</span>
                      {product.seller.verified && (
                        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={product.seller.rating} />
                      <span className="text-xs text-gray-500">
                        {product.seller.rating.toFixed(1)} ({product.seller.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Details Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Card Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Set', value: product.set },
              { label: 'Card Number', value: product.cardNumber },
              { label: 'Rarity', value: product.rarity },
              { label: 'Language', value: product.language },
              { label: 'Condition', value: product.condition },
              { label: 'Product Type', value: productTypeLabels[product.productType] || product.productType },
              ...(isGraded ? [
                { label: 'Grading Company', value: product.gradingCompany },
                { label: 'Grade', value: product.grade },
                { label: 'Certification #', value: product.certificationNumber },
              ] : []),
            ].filter(item => item.value).map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Market Data Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Market Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Market Price</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(product.price, product.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">7-Day Change</p>
              {product.priceChangePercent != null && product.priceChangePercent !== 0 ? (
                <p className={`text-2xl font-bold ${product.priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.priceChangePercent > 0 ? '+' : ''}{product.priceChangePercent.toFixed(1)}%
                </p>
              ) : (
                <p className="text-2xl font-bold text-gray-300">—</p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Weekly Trend</p>
              {product.priceChangePercent != null && product.priceChangePercent !== 0 ? (
                <div className={`flex items-center gap-2 text-sm font-medium ${product.priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points={product.priceChangePercent > 0 ? "23 6 13.5 15.5 8.5 10.5 1 18" : "23 18 13.5 8.5 8.5 13.5 1 6"} />
                  </svg>
                  {product.priceChangePercent > 0 ? 'Upward trend' : 'Downward trend'}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Stable</p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-5 pt-4 border-t border-gray-100">
            Market data reflects recent sales and listings across major TCG marketplaces. Prices may vary based on condition, grading, and seller.
          </p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-5">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
