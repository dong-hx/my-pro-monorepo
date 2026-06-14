// ---- 映射函数 ----
import { normalizeImageUrl } from '@/shared/lib/image-url'

import type {
  Cart,
  CartLine,
  Collection,
  Money,
  Product,
  ProductCardData,
  ShopifyImage,
} from './types'

// ---- 原始 Shopify 结构（与 fragments 对应）----
interface RawImage {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}
type RawMoney = { amount: string; currencyCode: string }
type RawMetafield = { value: string } | null
interface RawConnection<T> {
  nodes: T[]
}

interface RawProductCard {
  id: string
  handle: string
  title: string
  productType: string
  tags: string[]
  availableForSale: boolean
  featuredImage: RawImage | null
  priceRange: { minVariantPrice: RawMoney }
  compareAtPriceRange: { minVariantPrice: RawMoney }
  rating: RawMetafield
  ratingCount: RawMetafield
}

interface RawVariant {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number | null
  selectedOptions: { name: string; value: string }[]
  price: RawMoney
  compareAtPrice: RawMoney | null
  image: RawImage | null
}

interface RawProduct extends Omit<RawProductCard, 'priceRange' | 'compareAtPriceRange'> {
  description: string
  descriptionHtml: string
  vendor: string
  images: RawConnection<RawImage>
  options: { id: string; name: string; values: { name: string }[] }[]
  variants: RawConnection<RawVariant>
  priceRange: { minVariantPrice: RawMoney; maxVariantPrice: RawMoney }
  compareAtPriceRange: { minVariantPrice: RawMoney; maxVariantPrice: RawMoney }
}

interface RawCollection {
  id: string
  handle: string
  title: string
  description: string
  image: RawImage | null
}

interface RawCartLine {
  id: string
  quantity: number
  cost: { totalAmount: RawMoney }
  merchandise: {
    id: string
    title: string
    quantityAvailable: number | null
    selectedOptions: { name: string; value: string }[]
    image: RawImage | null
    product: { handle: string; title: string }
  }
}

interface RawCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: RawMoney
    totalAmount: RawMoney
    totalTaxAmount: RawMoney | null
  }
  lines: RawConnection<RawCartLine>
}

function mapImage(img: RawImage | null): ShopifyImage | null {
  return img
    ? {
        url: normalizeImageUrl(img.url),
        altText: img.altText,
        width: img.width,
        height: img.height,
      }
    : null
}

function mapMoney(m: RawMoney): Money {
  return { amount: m.amount, currencyCode: m.currencyCode }
}

function parseMetafieldNumber(mf: RawMetafield): number | null {
  if (!mf?.value) return null
  const n = Number(mf.value)
  return Number.isFinite(n) ? n : null
}

export function mapProductCard(raw: RawProductCard): ProductCardData {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    productType: raw.productType,
    tags: raw.tags,
    availableForSale: raw.availableForSale,
    featuredImage: mapImage(raw.featuredImage),
    price: mapMoney(raw.priceRange.minVariantPrice),
    compareAtPrice:
      raw.compareAtPriceRange.minVariantPrice.amount !== '0.0'
        ? mapMoney(raw.compareAtPriceRange.minVariantPrice)
        : null,
    rating: parseMetafieldNumber(raw.rating),
    ratingCount: parseMetafieldNumber(raw.ratingCount),
  }
}

export function mapProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    vendor: raw.vendor,
    productType: raw.productType,
    tags: raw.tags,
    availableForSale: raw.availableForSale,
    featuredImage: mapImage(raw.featuredImage),
    images: raw.images.nodes.map(mapImage).filter((i): i is ShopifyImage => i !== null),
    options: raw.options.map((o) => ({
      id: o.id,
      name: o.name,
      values: o.values.map((v) => v.name),
    })),
    variants: raw.variants.nodes.map((v) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      quantityAvailable: v.quantityAvailable,
      price: mapMoney(v.price),
      compareAtPrice: v.compareAtPrice ? mapMoney(v.compareAtPrice) : null,
      selectedOptions: v.selectedOptions,
      image: mapImage(v.image),
    })),
    priceRange: {
      minVariantPrice: mapMoney(raw.priceRange.minVariantPrice),
      maxVariantPrice: mapMoney(raw.priceRange.maxVariantPrice),
    },
    compareAtPriceRange: {
      minVariantPrice: mapMoney(raw.compareAtPriceRange.minVariantPrice),
      maxVariantPrice: mapMoney(raw.compareAtPriceRange.maxVariantPrice),
    },
    rating: parseMetafieldNumber(raw.rating),
    ratingCount: parseMetafieldNumber(raw.ratingCount),
  }
}

export function mapCollection(raw: RawCollection): Collection {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    image: mapImage(raw.image),
  }
}

function mapCartLine(raw: RawCartLine): CartLine {
  return {
    id: raw.id,
    quantity: raw.quantity,
    cost: { totalAmount: mapMoney(raw.cost.totalAmount) },
    merchandise: {
      id: raw.merchandise.id,
      title: raw.merchandise.title,
      quantityAvailable: raw.merchandise.quantityAvailable,
      product: raw.merchandise.product,
      selectedOptions: raw.merchandise.selectedOptions,
      image: mapImage(raw.merchandise.image),
    },
  }
}

export function mapCart(raw: RawCart): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    lines: raw.lines.nodes.map(mapCartLine),
    cost: {
      subtotalAmount: mapMoney(raw.cost.subtotalAmount),
      totalAmount: mapMoney(raw.cost.totalAmount),
      totalTaxAmount: raw.cost.totalTaxAmount ? mapMoney(raw.cost.totalTaxAmount) : null,
    },
  }
}

export type { RawCart, RawCartLine, RawCollection, RawProduct, RawProductCard }
