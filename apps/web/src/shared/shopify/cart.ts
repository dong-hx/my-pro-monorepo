import { ShopifyError, shopifyFetch } from './client'
import { type RawCart, mapCart } from './mappers'
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
} from './mutations'
import type { Cart } from './types'

interface CartMutationResult {
  cart: RawCart | null
  userErrors: { field: string[] | null; message: string }[]
}

function unwrap(result: CartMutationResult | undefined): Cart {
  if (!result) throw new ShopifyError('购物车操作无返回')
  if (result.userErrors?.length) {
    throw new ShopifyError(result.userErrors.map((e) => e.message).join('; '), result.userErrors)
  }
  if (!result.cart) throw new ShopifyError('购物车操作未返回 cart')
  return mapCart(result.cart)
}

export interface CartLineInput {
  merchandiseId: string
  quantity: number
}

export async function createCart(lines: CartLineInput[] = []): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: CartMutationResult }>({
    query: CART_CREATE_MUTATION,
    variables: { lines },
    cache: 'no-store',
  })
  return unwrap(data.cartCreate)
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationResult }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })
  return unwrap(data.cartLinesAdd)
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationResult }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })
  return unwrap(data.cartLinesUpdate)
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationResult }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })
  return unwrap(data.cartLinesRemove)
}
