'use client'

import { Minus, Plus, X } from 'lucide-react'
import Link from 'next/link'

import { productPath } from '@/shared/lib/product-path'
import type { CartLine } from '@/shared/shopify'
import { Price, ShopifyImage } from '@/shared/ui'

import { useCart } from '../model/cart-context'

export function CartLineItem({ line, onNavigate }: { line: CartLine; onNavigate?: () => void }) {
  const { updateLine, removeLine, pending } = useCart()
  const variantLabel = line.merchandise.selectedOptions
    .filter((o) => o.value !== 'Default Title')
    .map((o) => o.value)
    .join(' / ')

  return (
    <div className="flex gap-4 py-4">
      <Link
        href={productPath(line.merchandise.product.handle)}
        onClick={onNavigate}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand"
      >
        {line.merchandise.image && (
          <ShopifyImage
            src={line.merchandise.image.url}
            alt={line.merchandise.image.altText ?? line.merchandise.product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={productPath(line.merchandise.product.handle)}
              onClick={onNavigate}
              className="text-sm font-medium text-ink hover:text-clay"
            >
              {line.merchandise.product.title}
            </Link>
            {variantLabel && <p className="text-xs text-muted">{variantLabel}</p>}
          </div>
          <button
            type="button"
            aria-label="Remove item"
            disabled={pending}
            onClick={() => removeLine(line.id)}
            className="text-muted transition-colors hover:text-danger"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center overflow-hidden rounded-md border border-soft-clay/50">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={pending}
              onClick={() => updateLine(line.id, line.quantity - 1)}
              className="px-2 py-1 text-ink disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-6 text-center text-sm">{line.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={pending}
              onClick={() => updateLine(line.id, line.quantity + 1)}
              className="px-2 py-1 text-ink disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <Price price={line.cost.totalAmount} className="text-sm" />
        </div>
      </div>
    </div>
  )
}
