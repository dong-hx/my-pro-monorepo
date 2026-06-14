'use client'

import { useState } from 'react'

import { cn } from '@repo/ui'

import type { ShopifyImage as ShopifyImageType } from '@/shared/shopify'
import { ShopifyImage } from '@/shared/ui'

export function ProductGallery({ images, title }: { images: ShopifyImageType[]; title: string }) {
  const [active, setActive] = useState(0)
  const main = images[active] ?? images[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-card bg-sand">
        {main && (
          <ShopifyImage
            src={main.url}
            alt={main.altText ?? title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.slice(0, 5).map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-lg bg-sand ring-offset-2',
                i === active ? 'ring-2 ring-clay' : 'ring-1 ring-ink/10',
              )}
              aria-label={`View image ${i + 1}`}
            >
              <ShopifyImage
                src={img.url}
                alt={img.altText ?? `${title} thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
