'use client'

import { cn } from '@repo/ui'

import { useUIStore } from '@/shared/model'
import { Button } from '@/shared/ui'

import { useCart } from '../model/cart-context'

interface AddToCartButtonProps {
  variantId: string | null
  available: boolean
  className?: string
}

export function AddToCartButton({ variantId, available, className }: AddToCartButtonProps) {
  const { addItem, pending } = useCart()
  const setCartOpen = useUIStore((s) => s.setCartOpen)

  if (!available) {
    return (
      <Button disabled size="lg" className={cn('w-full', className)}>
        Sold out
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      className={cn('w-full', className)}
      disabled={pending || !variantId}
      onClick={() => {
        if (!variantId) return
        addItem(variantId, 1, () => setCartOpen(true))
      }}
    >
      Add to Cart
    </Button>
  )
}
