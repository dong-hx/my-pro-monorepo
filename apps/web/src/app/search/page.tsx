import { Suspense } from 'react'

import type { Metadata } from 'next'

import { SearchResults } from '@/features/search'
import { isShopifyConfigured } from '@/shared/config/env'
import { searchProducts } from '@/shared/shopify'
import { Skeleton } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'Search',
}

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

async function SearchContent({ query }: { query: string }) {
  if (!isShopifyConfigured()) {
    return <p className="text-muted">请配置 Shopify 环境变量以启用搜索。</p>
  }

  const { items } = query
    ? await searchProducts({ query, first: 48 }).catch(() => ({
        items: [],
        pageInfo: { hasNextPage: false, endCursor: null },
      }))
    : { items: [] }

  return <SearchResults initialQuery={query} products={items} />
}

function SearchFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-12 w-full max-w-xl rounded-md" />
    </div>
  )
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = '' } = await searchParams

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <Suspense fallback={<SearchFallback />}>
        <SearchContent query={q} />
      </Suspense>
    </main>
  )
}
