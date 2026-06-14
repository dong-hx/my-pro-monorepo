import Link from 'next/link'

import { ProductCard } from '@/entities/product'
import type { ProductCardData } from '@/shared/shopify'

interface ProductRailProps {
  title: string
  products: ProductCardData[]
  viewAllHref?: string
  viewAllLabel?: string
}

export function ProductRail({
  title,
  products,
  viewAllHref,
  viewAllLabel = 'View all products',
}: ProductRailProps) {
  if (products.length === 0) return null
  return (
    <section className="section-shell">
      <div className="flex items-end justify-between gap-4 pb-1">
        <h2 className="section-title">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="home-link-caps">
            {viewAllLabel}
          </Link>
        )}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 2} variant="home" />
        ))}
      </div>
    </section>
  )
}
