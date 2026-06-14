'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { Button, Price } from '@/shared/ui'

import { useCart } from '../model/cart-context'
import { CartLineItem } from './cart-line-item'

export function CartView() {
  const { cart } = useCart()
  const isEmpty = !cart || cart.lines.length === 0

  if (isEmpty) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-stone" />
        <h1 className="section-title">Your bag is empty</h1>
        <p className="text-muted">Discover thoughtfully made essentials for your companion.</p>
        <Button asChild size="lg">
          <Link href="/collections/all">Shop all products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="page-title">Your Bag</h1>
        <div className="mt-6 divide-y divide-soft-clay/30 border-t border-soft-clay/30">
          {cart.lines.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-card bg-sand p-6 lg:sticky lg:top-28">
        <h2 className="section-title text-xl lg:text-2xl">Order Summary</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between text-muted">
            <dt>Subtotal</dt>
            <dd>
              <Price price={cart.cost.subtotalAmount} className="text-ink" />
            </dd>
          </div>
          <div className="flex justify-between text-muted">
            <dt>Shipping</dt>
            <dd>Calculated at checkout</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-soft-clay/30 pt-4 text-base font-medium text-ink">
          <span>Total</span>
          <Price price={cart.cost.totalAmount} />
        </div>
        <Button asChild size="lg" className="mt-6 w-full">
          <a href={cart.checkoutUrl}>Checkout</a>
        </Button>
        <Link
          href="/collections/all"
          className="mt-4 block text-center text-sm text-muted hover:text-ink"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  )
}
