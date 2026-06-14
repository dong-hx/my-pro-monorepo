'use client'

import { useEffect, useState } from 'react'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { previewSearch } from '@/features/search/actions'
import { productPath } from '@/shared/lib/product-path'
import { searchPath } from '@/shared/lib/search-path'
import { useUIStore } from '@/shared/model'
import type { ProductCardData } from '@/shared/shopify'
import { Button, Dialog, DialogContent, Price, ShopifyImage, Skeleton } from '@/shared/ui'

interface PreviewState {
  query: string
  loading: boolean
  results: ProductCardData[]
}

const emptyPreview: PreviewState = { query: '', loading: false, results: [] }

export function SearchDialog() {
  const open = useUIStore((s) => s.searchOpen)
  const setSearchOpen = useUIStore((s) => s.setSearchOpen)
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState<PreviewState>(emptyPreview)

  const trimmedQuery = query.trim()
  const canPreview = open && trimmedQuery.length > 0
  const isCurrentPreview = preview.query === trimmedQuery
  const loading = canPreview && isCurrentPreview && preview.loading
  const results = canPreview && isCurrentPreview ? preview.results : []

  useEffect(() => {
    if (!canPreview) return

    let cancelled = false
    const timer = window.setTimeout(() => {
      void previewSearch(trimmedQuery)
        .then((items) => {
          if (!cancelled) {
            setPreview({ query: trimmedQuery, loading: false, results: items })
          }
        })
        .catch(() => {
          if (!cancelled) {
            setPreview({ query: trimmedQuery, loading: false, results: [] })
          }
        })
    }, 300)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [canPreview, trimmedQuery])

  function handleQueryChange(value: string) {
    setQuery(value)
    const nextTrimmed = value.trim()
    if (!nextTrimmed) {
      setPreview(emptyPreview)
      return
    }
    setPreview({ query: nextTrimmed, loading: true, results: [] })
  }

  function handleOpenChange(nextOpen: boolean) {
    setSearchOpen(nextOpen)
    if (!nextOpen) {
      setQuery('')
      setPreview(emptyPreview)
    }
  }

  function goToSearchResults() {
    if (!trimmedQuery) return
    handleOpenChange(false)
    router.push(searchPath(trimmedQuery))
  }

  function onProductSelect() {
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent title="Search products" aria-describedby={undefined}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            goToSearchResults()
          }}
          className="border-b border-soft-clay/30 px-5 py-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="h-12 w-full rounded-md border border-soft-clay bg-sand pl-11 pr-28 text-sm outline-none focus:border-sage"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!trimmedQuery}
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </form>

        <div className="max-h-[min(50vh,24rem)] overflow-y-auto px-5 py-4">
          {!trimmedQuery && <p className="text-sm text-muted">Type a keyword to find products.</p>}

          {canPreview && loading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          )}

          {canPreview && !loading && results.length === 0 && (
            <p className="text-sm text-muted">No products found. Try another keyword.</p>
          )}

          {canPreview && !loading && results.length > 0 && (
            <ul className="space-y-1">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={productPath(product.handle)}
                    onClick={onProductSelect}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-sand/60"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                      {product.featuredImage ? (
                        <ShopifyImage
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText ?? product.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{product.title}</p>
                      <Price
                        price={product.price}
                        compareAtPrice={product.compareAtPrice}
                        className="text-sm"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {canPreview && !loading && results.length > 0 && (
          <div className="border-t border-soft-clay/30 px-5 py-4">
            <Button type="button" variant="outline" className="w-full" onClick={goToSearchResults}>
              View all results for &ldquo;{trimmedQuery}&rdquo;
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
