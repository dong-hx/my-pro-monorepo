import type { Collection } from '@/shared/shopify'

/**
 * 设计稿固定导航对应的 curated 页。
 * Shopify 无同名 collection 时，用 Storefront search query 按 tag 筛选商品。
 * 后台创建 handle 一致的 collection 后，会优先走真实集合数据。
 */
export const CURATED_COLLECTIONS: Record<
  string,
  { title: string; description: string; query: string }
> = {
  dogs: {
    title: 'Dogs',
    description: 'Thoughtfully selected essentials for canine companions.',
    query: 'tag:dogs OR tag:dog OR tag:Dogs',
  },
  cats: {
    title: 'Cats',
    description: 'Quiet luxury pieces designed for feline friends.',
    query: 'tag:cats OR tag:cat OR tag:Cats',
  },
  wellness: {
    title: 'Wellness',
    description: 'Nutrition and care for everyday wellbeing.',
    query: 'tag:wellness OR tag:Wellness',
  },
}

export function toSyntheticCollection(
  handle: string,
  meta: { title: string; description: string },
): Collection {
  return {
    id: `curated-${handle}`,
    handle,
    title: meta.title,
    description: meta.description,
    image: null,
  }
}

export function getCuratedCollection(handle: string) {
  return CURATED_COLLECTIONS[handle] ?? null
}
