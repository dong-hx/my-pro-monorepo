import Link from 'next/link'

import { productPath } from '@/shared/lib/product-path'
import type { ProductCardData } from '@/shared/shopify'
import { Badge, Price, Rating, ShopifyImage } from '@/shared/ui'

interface ProductCardProps {
  product: ProductCardData
  priority?: boolean
  showRating?: boolean
  variant?: 'default' | 'home'
}

function cardBadge(
  product: ProductCardData,
): { label: string; variant: 'sale' | 'new' | 'muted' } | null {
  if (!product.availableForSale) {
    return { label: 'Sold out', variant: 'muted' }
  }

  const onSale =
    product.compareAtPrice != null &&
    Number(product.compareAtPrice.amount) > Number(product.price.amount)
  if (onSale) {
    return { label: 'Sale', variant: 'sale' }
  }

  const isNew = product.tags.some((tag) => ['New', 'New Arrival', 'NEW ARRIVAL'].includes(tag))
  if (isNew) {
    return { label: 'New arrival', variant: 'new' }
  }

  return null
}

export function ProductCard({
  product,
  priority,
  showRating = false,
  variant = 'default',
}: ProductCardProps) {
  const badge = cardBadge(product)
  const isHome = variant === 'home'

  return (
    <Link href={productPath(product.handle)} className="group block">
      <div
        className={`relative aspect-square overflow-hidden rounded-card ${
          isHome ? 'bg-sand' : 'bg-sand-dim'
        }`}
      >
        {product.featuredImage ? (
          <ShopifyImage
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">No image</div>
        )}
        {badge && (
          <div className="absolute left-3 top-3">
            <Badge variant={badge.variant} className={isHome ? 'px-2.5 py-0.5' : undefined}>
              {badge.label}
            </Badge>
          </div>
        )}
      </div>
      <div className={`space-y-1 ${isHome ? 'mt-3' : 'mt-3'}`}>
        <h3
          className={
            isHome
              ? 'font-serif text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-clay'
              : 'font-serif text-sm font-semibold text-ink transition-colors group-hover:text-clay'
          }
        >
          {product.title}
        </h3>
        {product.productType && <p className="text-xs text-muted">{product.productType}</p>}
        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          className={isHome ? 'text-sm text-ink' : 'text-sm'}
        />
        {showRating && product.rating != null && (
          <Rating value={product.rating} count={product.ratingCount} className="text-xs" />
        )}
      </div>
    </Link>
  )
}
