'use client'

import { useState } from 'react'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { searchPath } from '@/shared/lib/search-path'
import type { ProductCardData } from '@/shared/shopify'
import { Button } from '@/shared/ui'
import { ProductGrid } from '@/widgets/product-grid'

interface SearchResultsProps {
  initialQuery: string
  products: ProductCardData[]
}

export function SearchResults({ initialQuery, products }: SearchResultsProps) {
  const router = useRouter()
  const [q, setQ] = useState(initialQuery)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = q.trim()
    router.push(searchPath(trimmed))
  }

  return (
    <div>
      <h1 className="page-title">Search</h1>
      <form onSubmit={onSubmit} className="relative mt-6 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="h-12 w-full rounded-md border border-soft-clay bg-cream pl-11 pr-28 text-sm outline-none focus:border-sage"
        />
        <Button type="submit" size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2">
          Search
        </Button>
      </form>

      <p className="mt-8 text-sm text-muted">
        {initialQuery
          ? `${products.length} results for “${initialQuery}”`
          : 'Enter a keyword to search'}
      </p>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
