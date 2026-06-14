import { SITE_NAME, getSiteUrl } from '@/shared/config/site'
import { productPath } from '@/shared/lib/product-path'
import type { Product } from '@/shared/shopify'

export function organizationJsonLd() {
  const url = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url,
    logo: `${url}/favicon.ico`,
  }
}

export function productJsonLd(product: Product) {
  const url = getSiteUrl()
  const productUrl = `${url}${productPath(product.handle)}`
  const image = product.featuredImage?.url

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: image ? [image] : undefined,
    sku: product.variants[0]?.id,
    brand: product.vendor ? { '@type': 'Brand', name: product.vendor } : undefined,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: productUrl,
    },
    ...(product.rating != null && product.ratingCount != null
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.ratingCount,
          },
        }
      : {}),
  }
}
