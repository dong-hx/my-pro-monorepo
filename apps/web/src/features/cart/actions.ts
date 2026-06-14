'use server'

import { cookies } from 'next/headers'

import {
  CART_COOKIE,
  type Cart,
  type CartLine,
  ShopifyError,
  addCartLines,
  createCart,
  getCart,
  removeCartLines,
  updateCartLines,
} from '@/shared/shopify'

export interface CartActionResult {
  cart: Cart | null
  error?: string
}

const STOCK_CAP_MESSAGE = 'Unable to add more of this item right now.'

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
}

async function readCartId(): Promise<string | undefined> {
  return (await cookies()).get(CART_COOKIE)?.value
}

async function clearCartCookie(): Promise<void> {
  ;(await cookies()).delete(CART_COOKIE)
}

async function persistCartId(cartId: string): Promise<void> {
  ;(await cookies()).set(CART_COOKIE, cartId, COOKIE_OPTS)
}

function isStaleCartError(e: unknown): boolean {
  if (!(e instanceof ShopifyError)) return false
  const msg = e.message.toLowerCase()
  return (
    msg.includes('不存在') ||
    msg.includes('not exist') ||
    msg.includes('not found') ||
    msg.includes('invalid cart')
  )
}

/** 读取 cookie 中的 cart；若 Shopify 侧已失效则清除 cookie。 */
async function loadCartFromCookie(): Promise<Cart | null> {
  const id = await readCartId()
  if (!id) return null
  try {
    const cart = await getCart(id)
    if (!cart) {
      await clearCartCookie()
      return null
    }
    return cart
  } catch {
    await clearCartCookie()
    return null
  }
}

async function ensureCartWithLines(
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const existing = await loadCartFromCookie()
  if (existing) {
    try {
      return await addCartLines(existing.id, lines)
    } catch (e) {
      if (isStaleCartError(e)) {
        await clearCartCookie()
        const cart = await createCart(lines)
        await persistCartId(cart.id)
        return cart
      }
      throw e
    }
  }
  const cart = await createCart(lines)
  await persistCartId(cart.id)
  return cart
}

async function mutateCart<T>(fn: (cartId: string) => Promise<T>): Promise<T> {
  const existing = await loadCartFromCookie()
  if (!existing) throw new ShopifyError('购物车不存在')
  try {
    return await fn(existing.id)
  } catch (e) {
    if (isStaleCartError(e)) {
      await clearCartCookie()
      throw new ShopifyError('购物车已过期，请重新添加商品')
    }
    throw e
  }
}

function toError(e: unknown): string {
  if (e instanceof ShopifyError) return e.message
  return '购物车操作失败，请稍后再试'
}

function findLineByMerchandise(cart: Cart, merchandiseId: string): CartLine | undefined {
  return cart.lines.find((line) => line.merchandise.id === merchandiseId)
}

export async function getCartAction(): Promise<Cart | null> {
  return loadCartFromCookie()
}

export async function addItemAction(
  merchandiseId: string,
  quantity = 1,
): Promise<CartActionResult> {
  try {
    const existing = await loadCartFromCookie()
    const beforeLine = existing ? findLineByMerchandise(existing, merchandiseId) : undefined
    const cart = await ensureCartWithLines([{ merchandiseId, quantity }])
    const afterLine = findLineByMerchandise(cart, merchandiseId)
    const beforeQty = beforeLine?.quantity ?? 0
    const afterQty = afterLine?.quantity ?? 0

    if (afterQty < beforeQty + quantity) {
      return { cart, error: STOCK_CAP_MESSAGE }
    }
    return { cart }
  } catch (e) {
    return { cart: null, error: toError(e) }
  }
}

export async function updateLineAction(
  lineId: string,
  quantity: number,
): Promise<CartActionResult> {
  try {
    const cart = await mutateCart((cartId) =>
      quantity <= 0
        ? removeCartLines(cartId, [lineId])
        : updateCartLines(cartId, [{ id: lineId, quantity }]),
    )

    if (quantity > 0) {
      const updated = cart.lines.find((line) => line.id === lineId)
      if (updated && updated.quantity < quantity) {
        return { cart, error: STOCK_CAP_MESSAGE }
      }
    }
    return { cart }
  } catch (e) {
    return { cart: null, error: toError(e) }
  }
}

export async function removeLineAction(lineId: string): Promise<CartActionResult> {
  try {
    const cart = await mutateCart((cartId) => removeCartLines(cartId, [lineId]))
    return { cart }
  } catch (e) {
    return { cart: null, error: toError(e) }
  }
}
