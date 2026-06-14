// 缓存 tag：用于 revalidateTag 按域精准失效
export const TAGS = {
  products: 'products',
  collections: 'collections',
  cart: 'cart',
} as const

export const DEFAULT_REVALIDATE = 60 * 60 * 24 // 24h，配合 webhook 按需失效

export const CART_COOKIE = 'cartId'
