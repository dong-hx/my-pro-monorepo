'use client'

import { useMemo, useState } from 'react'

import { cn } from '@repo/ui'
import { Leaf, ShieldCheck, Truck } from 'lucide-react'

import { AddToCartButton } from '@/features/cart'
import type { Product, ProductVariant } from '@/shared/shopify'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Price,
  Rating,
} from '@/shared/ui'

import { ProductGallery } from './product-gallery'

function findVariant(
  variants: ProductVariant[],
  selected: Record<string, string>,
): ProductVariant | null {
  return variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ?? null
}

export function ProductDetail({ product }: { product: Product }) {
  const initial = useMemo<Record<string, string>>(() => {
    const firstAvailable = product.variants.find((v) => v.availableForSale) ?? product.variants[0]
    const acc: Record<string, string> = {}
    firstAvailable?.selectedOptions.forEach((o) => {
      acc[o.name] = o.value
    })
    return acc
  }, [product.variants])

  const [selected, setSelected] = useState<Record<string, string>>(initial)
  const variant = findVariant(product.variants, selected)

  const price = variant?.price ?? product.priceRange.minVariantPrice
  const compareAt = variant?.compareAtPrice ?? null
  const available = variant?.availableForSale ?? false
  const hasRealOptions =
    product.options.length > 0 && product.options[0]?.values[0] !== 'Default Title'

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery
        images={
          product.images.length
            ? product.images
            : product.featuredImage
              ? [product.featuredImage]
              : []
        }
        title={product.title}
      />

      <div className="flex flex-col">
        {product.vendor && <p className="home-kicker">{product.vendor}</p>}
        <h1 className="page-title mt-2">{product.title}</h1>

        {product.rating != null && (
          <div className="mt-3">
            <Rating value={product.rating} count={product.ratingCount} />
          </div>
        )}

        <div className="mt-4 text-xl">
          <Price price={price} compareAtPrice={compareAt} />
        </div>

        {hasRealOptions && (
          <div className="mt-8 space-y-6">
            {product.options.map((option) => (
              <div key={option.id}>
                <p className="text-sm font-medium text-ink">{option.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isSelected = selected[option.name] === value
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [option.name]: value }))}
                        className={cn('option-pill', isSelected && 'option-pill-active')}
                      >
                        {value}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <AddToCartButton variantId={variant?.id ?? null} available={available} />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-4 w-4" /> Carbon-neutral shipping
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Leaf className="h-4 w-4" /> Sustainably sourced
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> 30-day guarantee
          </span>
        </div>

        {product.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Accordion type="single" collapsible className="mt-8" defaultValue="description">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              {product.descriptionHtml ? (
                <div
                  className="prose-sm space-y-2 [&_a]:text-clay [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p>{product.description}</p>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping &amp; Returns</AccordionTrigger>
            <AccordionContent>
              Free carbon-neutral shipping on orders over $75. Easy 30-day returns on unused items.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
