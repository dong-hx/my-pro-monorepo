import { ProductCard } from '@/entities/product'
import type { ProductCardData } from '@/shared/shopify'

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-muted">No products found.</p>
  }
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} showRating />
      ))}
    </div>
  )
}
