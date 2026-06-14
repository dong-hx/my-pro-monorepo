'use client'

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react'

import { toast } from 'sonner'

import type { Cart } from '@/shared/shopify'

import {
  type CartActionResult,
  addItemAction,
  getCartAction,
  removeLineAction,
  updateLineAction,
} from '../actions'

interface CartContextValue {
  cart: Cart | null
  totalQuantity: number
  pending: boolean
  addItem: (merchandiseId: string, quantity?: number, onSuccess?: () => void) => void
  updateLine: (lineId: string, quantity: number) => void
  removeLine: (lineId: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [optimisticQty, setOptimisticQty] = useState<number | null>(null)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    getCartAction()
      .then(setCart)
      .catch(() => {})
  }, [])

  const run = useCallback(
    (
      fn: () => Promise<CartActionResult>,
      options?: { optimisticDelta?: number; successMessage?: string; onSuccess?: () => void },
    ) => {
      if (options?.optimisticDelta != null) {
        setOptimisticQty((cart?.totalQuantity ?? 0) + options.optimisticDelta)
      }
      startTransition(async () => {
        const res = await fn()
        setOptimisticQty(null)
        if (res.error) {
          if (res.cart) setCart(res.cart)
          toast.error(res.error)
          return
        }
        setCart(res.cart)
        if (options?.successMessage) toast.success(options.successMessage)
        options?.onSuccess?.()
      })
    },
    [cart?.totalQuantity],
  )

  const addItem = useCallback(
    (merchandiseId: string, quantity = 1, onSuccess?: () => void) => {
      run(() => addItemAction(merchandiseId, quantity), {
        optimisticDelta: quantity,
        successMessage: 'Added to your bag',
        onSuccess,
      })
    },
    [run],
  )

  const updateLine = useCallback(
    (lineId: string, quantity: number) => {
      run(() => updateLineAction(lineId, quantity))
    },
    [run],
  )

  const removeLine = useCallback(
    (lineId: string) => {
      run(() => removeLineAction(lineId))
    },
    [run],
  )

  const totalQuantity = optimisticQty ?? cart?.totalQuantity ?? 0

  return (
    <CartContext.Provider value={{ cart, totalQuantity, pending, addItem, updateLine, removeLine }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart 必须在 CartProvider 内使用')
  return ctx
}
