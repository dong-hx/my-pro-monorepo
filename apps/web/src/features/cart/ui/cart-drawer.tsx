'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { useUIStore } from '@/shared/model'
import { Button, Drawer, DrawerContent, Price } from '@/shared/ui'

import { useCart } from '../model/cart-context'
import { CartLineItem } from './cart-line-item'

export function CartDrawer() {
  const cartOpen = useUIStore((s) => s.cartOpen)
  const setCartOpen = useUIStore((s) => s.setCartOpen)
  const { cart, pending } = useCart()

  const isEmpty = !cart || cart.lines.length === 0

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerContent side="right" title="Your Bag">
        {pending && isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 animate-pulse text-stone" />
            <p className="text-sm text-muted">Adding to your bag…</p>
          </div>
        ) : isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-stone" />
            <p className="text-ink">Your bag is empty</p>
            <Button onClick={() => setCartOpen(false)}>Continue shopping</Button>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 divide-y divide-ink/5 px-5">
              {cart.lines.map((line) => (
                <CartLineItem key={line.id} line={line} onNavigate={() => setCartOpen(false)} />
              ))}
            </div>
            <div className="border-t border-soft-clay/30 px-5 py-5">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Subtotal</span>
                <Price
                  price={cart.cost.subtotalAmount}
                  className="text-base font-medium text-ink"
                />
              </div>
              <p className="mt-1 text-xs text-muted">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <Button asChild size="lg" className="mt-4 w-full">
                <a href={cart.checkoutUrl}>Checkout</a>
              </Button>
              <Link
                href="/cart"
                onClick={() => setCartOpen(false)}
                className="mt-3 block text-center text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                View full bag
              </Link>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
