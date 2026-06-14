import type { MetadataRoute } from 'next'

import { isShopifyConfigured } from '@/shared/config/env'
import { getSiteUrl } from '@/shared/config/site'
import { collectionPath, productPath } from '@/shared/lib/product-path'
import { getCollections, getProducts } from '@/shared/shopify'

const STATIC_ROUTES = [
  '',
  '/about',
  '/faq',
  '/shipping-returns',
  '/contact',
  '/search',
  '/cart',
  '/collections/all',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'monthly',
    priority: path === '' ? 1 : 0.6,
  }))

  if (!isShopifyConfigured()) return staticEntries

  try {
    const [products, collections] = await Promise.all([
      getProducts({ first: 100 }),
      getCollections(50),
    ])

    const productEntries: MetadataRoute.Sitemap = products.items.map((p) => ({
      url: `${base}${productPath(p.handle)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const collectionEntries: MetadataRoute.Sitemap = collections
      .filter((c) => c.handle !== 'all')
      .map((c) => ({
        url: `${base}${collectionPath(c.handle)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

    return [...staticEntries, ...collectionEntries, ...productEntries]
  } catch {
    return staticEntries
  }
}
