import type { Metadata } from 'next'

import { CartView } from '@/features/cart'

export const metadata: Metadata = {
  title: 'Your Bag',
}

export default function CartPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <CartView />
    </main>
  )
}
