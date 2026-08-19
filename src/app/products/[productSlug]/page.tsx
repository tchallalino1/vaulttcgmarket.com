import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/products/ProductCard';
import { AddToCartSection } from '@/components/products/AddToCartSection';

const productTypeLabels: Record<string, string> = {
  single: 'Raw', graded: 'Graded', sealed: 'Sealed', vintage: 'Vintage', accessory: 'Accessory',
};

export async function generateMetadata({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return { title: 'Not Found' };
  const title = product.gradingCompany && product.grade
    ? `${product.gradingCompany} ${product.grade} ${product.name}`
    : product.name;
  return {
    title: `${title} — Vault TCG Market`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) notFound();
  const relatedProducts = await getRelatedProducts(product, 4);

  const inStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;
  const isGraded = product.productType === 'graded' && product.gradingCompany && product.grade;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-purple-600">Products</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Grid — compact two-column */}
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 mb-12">
          {/* Left — Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[280px] md:w-full md:max-w-[340px]">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100">
                {product.pokemonTcgCardId ? (
                  <img
                    src={`https://images.pokemontcg.io/${product.pokemonTcgCardId.split('-')[0]}/${product.pokemonTcgCardId.split('-').slice(1).join('-')}.png`}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                  </div>
                )}
              </div>
              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <Badge variant={product.productType === 'graded' ? 'info' : product.productType === 'sealed' ? 'success' : 'purple'}>
                  {productTypeLabels[product.productType]}
                </Badge>
                {product.trending && <Badge variant="error">Trending</Badge>}
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col">
            {/* Title & Meta */}
            <div className="mb-4">
              {product.pokemon && (
                <Link href={`/pokemon/${product.pokemonSlug}`} className="text-xs text-purple-600 hover:text-purple-700 font-medium uppercase tracking-wide">
                  {product.pokemon}
                </Link>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
                {product.set && <span>{product.set}</span>}
                {product.cardNumber && <><span>·</span><span>{product.cardNumber}</span></>}
                {product.rarity && <><span>·</span><span>{product.rarity}</span></>}
              </div>
            </div>

            {/* Grading Badge */}
            {isGraded && (
              <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2.5 mb-4 w-fit">
                <span className="text-lg font-bold text-blue-700">{product.gradingCompany} {product.grade}</span>
                {product.certificationNumber && <span className="text-xs text-blue-500">Cert: {product.certificationNumber}</span>}
              </div>
            )}

            {/* Price */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-gray-400 line-through">${product.compareAtPrice!.toFixed(2)}</span>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">-{discountPercent}%</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm">
                {product.priceChangePercent && (
                  <span className={product.priceChangePercent > 0 ? 'text-green-600' : 'text-red-500'}>
                    {product.priceChangePercent > 0 ? '↑' : '↓'} {Math.abs(product.priceChangePercent)}% this week
                  </span>
                )}
                <span className={inStock ? 'text-green-600' : 'text-red-500'}>
                  {inStock ? `● In Stock${isLowStock ? ` — ${product.stock} left` : ''}` : '● Out of Stock'}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {product.condition && <div className="flex gap-2"><span className="text-gray-400">Condition</span><span className="font-medium text-gray-900">{product.condition}</span></div>}
                {product.language && <div className="flex gap-2"><span className="text-gray-400">Language</span><span className="font-medium text-gray-900">{product.language}</span></div>}
                {product.rarity && <div className="flex gap-2"><span className="text-gray-400">Rarity</span><span className="font-medium text-gray-900">{product.rarity}</span></div>}
                {product.set && <div className="flex gap-2"><span className="text-gray-400">Set</span><span className="font-medium text-gray-900">{product.set}</span></div>}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="border-t border-gray-100 pt-4 mt-auto">
              <AddToCartSection
                product={product}
                inStock={inStock}
                isLowStock={isLowStock}
                hasDiscount={hasDiscount}
                discountPercent={discountPercent}
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-10">
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
