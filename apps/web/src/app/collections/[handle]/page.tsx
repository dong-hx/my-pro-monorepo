import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCuratedCollection, toSyntheticCollection } from '@/shared/config/curated-collections'
import { isShopifyConfigured } from '@/shared/config/env'
import { decodeRouteParam } from '@/shared/lib/route-params'
import { getCollectionProducts, getProducts } from '@/shared/shopify'
import type { Collection, ProductCardData } from '@/shared/shopify'
import { CollectionPlp } from '@/widgets/collection-plp'

interface PageProps {
  params: Promise<{ handle: string }>
}

const ALL_PRODUCTS_COLLECTION: Collection = {
  id: 'all',
  handle: 'all',
  title: 'All Products',
  description: 'Browse our full collection of thoughtfully crafted essentials.',
  image: null,
}

const EMPTY_PRODUCTS: ProductCardData[] = []

async function loadCollectionPage(handle: string) {
  if (handle === 'all') {
    const products = await getProducts({ first: 48, sortKey: 'BEST_SELLING' }).catch(() => ({
      items: EMPTY_PRODUCTS,
      pageInfo: { hasNextPage: false, endCursor: null },
    }))
    return { collection: ALL_PRODUCTS_COLLECTION, products: products.items }
  }

  const fromShopify = await getCollectionProducts({ handle, first: 48 }).catch(() => null)
  if (fromShopify) {
    return { collection: fromShopify.collection, products: fromShopify.products.items }
  }

  const curated = getCuratedCollection(handle)
  if (curated) {
    const products = await getProducts({
      first: 48,
      query: curated.query,
      sortKey: 'BEST_SELLING',
    }).catch(() => ({
      items: EMPTY_PRODUCTS,
      pageInfo: { hasNextPage: false, endCursor: null },
    }))
    return {
      collection: toSyntheticCollection(handle, curated),
      products: products.items,
    }
  }

  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle: rawHandle } = await params
  const handle = decodeRouteParam(rawHandle)
  if (handle === 'all') return { title: 'All Products' }

  const curated = getCuratedCollection(handle)
  if (curated) {
    return { title: curated.title, description: curated.description.slice(0, 160) }
  }

  if (!isShopifyConfigured()) return { title: handle }
  const data = await getCollectionProducts({ handle, first: 1 }).catch(() => null)
  if (!data) return { title: 'Collection not found' }
  return {
    title: data.collection.title,
    description: data.collection.description.slice(0, 160),
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { handle: rawHandle } = await params
  const handle = decodeRouteParam(rawHandle)

  if (!isShopifyConfigured()) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <p className="text-muted">请配置 Shopify 环境变量以加载集合数据。</p>
      </main>
    )
  }

  const page = await loadCollectionPage(handle)
  if (!page) notFound()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <CollectionPlp collection={page.collection} products={page.products} />
    </main>
  )
}
