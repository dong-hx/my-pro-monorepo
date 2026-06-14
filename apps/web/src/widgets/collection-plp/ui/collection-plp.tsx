'use client'

import { useMemo, useState } from 'react'

import type { Collection, ProductCardData } from '@/shared/shopify'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui'
import { ProductGrid } from '@/widgets/product-grid'

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'title'

const SORT_LABELS: Record<SortKey, string> = {
  default: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  title: 'Name A–Z',
}

interface CollectionPlpProps {
  collection: Collection
  products: ProductCardData[]
}

export function CollectionPlp({ collection, products }: CollectionPlpProps) {
  const [sort, setSort] = useState<SortKey>('default')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  const productTypes = useMemo(
    () => [...new Set(products.map((p) => p.productType).filter(Boolean))].sort(),
    [products],
  )

  const visible = useMemo(() => {
    const list = typeFilter ? products.filter((p) => p.productType === typeFilter) : [...products]
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => Number(a.price.amount) - Number(b.price.amount))
        break
      case 'price-desc':
        list.sort((a, b) => Number(b.price.amount) - Number(a.price.amount))
        break
      case 'title':
        list.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }
    return list
  }, [products, sort, typeFilter])

  return (
    <div>
      <header className="max-w-2xl">
        <h1 className="page-title">{collection.title}</h1>
        {collection.description && <p className="mt-3 text-muted">{collection.description}</p>}
      </header>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-soft-clay/30 py-4">
        <p className="text-sm text-muted">{visible.length} products</p>
        <div className="flex flex-wrap items-center gap-3">
          {productTypes.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="filter-chip">
                {typeFilter ?? 'All types'}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem selected={!typeFilter} onSelect={() => setTypeFilter(null)}>
                  All types
                </DropdownMenuItem>
                {productTypes.map((t) => (
                  <DropdownMenuItem
                    key={t}
                    selected={typeFilter === t}
                    onSelect={() => setTypeFilter(t)}
                  >
                    {t}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="filter-chip">{SORT_LABELS[sort]}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                <DropdownMenuItem key={key} selected={sort === key} onSelect={() => setSort(key)}>
                  {SORT_LABELS[key]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-8">
        <ProductGrid products={visible} />
      </div>
    </div>
  )
}
