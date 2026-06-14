'use server'

import { isShopifyConfigured } from '@/shared/config/env'
import { type ProductCardData, searchProducts } from '@/shared/shopify'

import { searchQuerySchema } from './schemas/search.schema'

export async function previewSearch(rawQuery: string): Promise<ProductCardData[]> {
  const parsed = searchQuerySchema.safeParse(rawQuery)
  if (!parsed.success || !isShopifyConfigured()) {
    return []
  }

  const { items } = await searchProducts({ query: parsed.data, first: 6 }).catch(() => ({
    items: [],
    pageInfo: { hasNextPage: false, endCursor: null },
  }))

  return items
}
