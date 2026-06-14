// 经过映射的领域类型（对外稳定，隔离 Shopify 原始结构）

export interface Money {
  amount: string
  currencyCode: string
}

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}

export interface SelectedOption {
  name: string
  value: string
}

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number | null
  price: Money
  compareAtPrice: Money | null
  selectedOptions: SelectedOption[]
  image: ShopifyImage | null
}

export interface ProductOption {
  id: string
  name: string
  values: string[]
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  vendor: string
  productType: string
  tags: string[]
  availableForSale: boolean
  featuredImage: ShopifyImage | null
  images: ShopifyImage[]
  options: ProductOption[]
  variants: ProductVariant[]
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money }
  compareAtPriceRange: { minVariantPrice: Money; maxVariantPrice: Money }
  /** 评价聚合（来自 metafields，可能为空） */
  rating: number | null
  ratingCount: number | null
}

export interface ProductCardData {
  id: string
  handle: string
  title: string
  productType: string
  tags: string[]
  availableForSale: boolean
  featuredImage: ShopifyImage | null
  price: Money
  compareAtPrice: Money | null
  rating: number | null
  ratingCount: number | null
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
}

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    quantityAvailable: number | null
    product: { handle: string; title: string }
    selectedOptions: SelectedOption[]
    image: ShopifyImage | null
  }
  cost: { totalAmount: Money }
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: CartLine[]
  cost: {
    subtotalAmount: Money
    totalAmount: Money
    totalTaxAmount: Money | null
  }
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor: string | null
}

export interface Paginated<T> {
  items: T[]
  pageInfo: PageInfo
}

export type ProductSortKey = 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE' | 'TITLE'
