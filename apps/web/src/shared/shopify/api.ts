import { shopifyFetch } from './client'
import { DEFAULT_REVALIDATE, TAGS } from './constants'
import {
  type RawCart,
  type RawCollection,
  type RawProduct,
  type RawProductCard,
  mapCart,
  mapCollection,
  mapProduct,
  mapProductCard,
} from './mappers'
import {
  GET_CART_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
} from './queries'
import type { Cart, Collection, Paginated, Product, ProductCardData } from './types'

interface RawPageProducts {
  nodes: RawProductCard[]
  pageInfo: { hasNextPage: boolean; endCursor: string | null }
}

// ---- 商品 ----
export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
    tags: [TAGS.products, `product:${handle}`],
    revalidate: DEFAULT_REVALIDATE,
  })
  return data.product ? mapProduct(data.product) : null
}

export async function getProductRecommendations(productId: string): Promise<ProductCardData[]> {
  const data = await shopifyFetch<{ productRecommendations: RawProductCard[] }>({
    query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
    tags: [TAGS.products],
    revalidate: DEFAULT_REVALIDATE,
  })
  return (data.productRecommendations ?? []).map(mapProductCard)
}

interface GetProductsArgs {
  first?: number
  after?: string
  query?: string
  sortKey?: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE' | 'TITLE'
  reverse?: boolean
}

export async function getProducts(args: GetProductsArgs = {}): Promise<Paginated<ProductCardData>> {
  const data = await shopifyFetch<{ products: RawPageProducts }>({
    query: GET_PRODUCTS_QUERY,
    variables: {
      first: args.first ?? 24,
      after: args.after ?? null,
      query: args.query ?? null,
      sortKey: args.sortKey ?? 'BEST_SELLING',
      reverse: args.reverse ?? false,
    },
    tags: [TAGS.products],
    revalidate: DEFAULT_REVALIDATE,
  })
  return {
    items: data.products.nodes.map(mapProductCard),
    pageInfo: data.products.pageInfo,
  }
}

export async function searchProducts(args: GetProductsArgs): Promise<Paginated<ProductCardData>> {
  return getProducts({ ...args, sortKey: args.sortKey ?? 'RELEVANCE' })
}

// ---- 集合 ----
export async function getCollections(first = 20): Promise<Collection[]> {
  const data = await shopifyFetch<{ collections: { nodes: RawCollection[] } }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first },
    tags: [TAGS.collections],
    revalidate: DEFAULT_REVALIDATE,
  })
  return data.collections.nodes.map(mapCollection)
}

interface GetCollectionProductsArgs {
  handle: string
  first?: number
  after?: string
  sortKey?: 'COLLECTION_DEFAULT' | 'BEST_SELLING' | 'CREATED' | 'PRICE' | 'TITLE' | 'RELEVANCE'
  reverse?: boolean
}

export interface CollectionWithProducts {
  collection: Collection
  products: Paginated<ProductCardData>
}

export async function getCollectionProducts(
  args: GetCollectionProductsArgs,
): Promise<CollectionWithProducts | null> {
  const data = await shopifyFetch<{
    collection: (RawCollection & { products: RawPageProducts }) | null
  }>({
    query: GET_COLLECTION_PRODUCTS_QUERY,
    variables: {
      handle: args.handle,
      first: args.first ?? 24,
      after: args.after ?? null,
      sortKey: args.sortKey ?? 'COLLECTION_DEFAULT',
      reverse: args.reverse ?? false,
    },
    tags: [TAGS.collections, TAGS.products],
    revalidate: DEFAULT_REVALIDATE,
  })
  if (!data.collection) return null
  return {
    collection: mapCollection(data.collection),
    products: {
      items: data.collection.products.nodes.map(mapProductCard),
      pageInfo: data.collection.products.pageInfo,
    },
  }
}

// ---- 购物车（读）----
export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
  })
  return data.cart ? mapCart(data.cart) : null
}
