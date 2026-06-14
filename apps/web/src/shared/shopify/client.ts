import { getEnv } from '@/shared/config/env'

export class ShopifyError extends Error {
  constructor(
    message: string,
    readonly detail?: unknown,
  ) {
    super(message)
    this.name = 'ShopifyError'
  }
}

interface ShopifyFetchParams<V> {
  query: string
  variables?: V
  /** 缓存 tag（读操作） */
  tags?: string[]
  /** ISR 失效秒数（读操作） */
  revalidate?: number | false
  /** 写操作/购物车设为 'no-store' */
  cache?: RequestCache
}

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * 统一的 Shopify Storefront API 访问入口。
 * 使用原生 fetch 以支持 Next 的缓存/ISR（next.tags / revalidate）。
 */
export async function shopifyFetch<T, V = Record<string, unknown>>({
  query,
  variables,
  tags,
  revalidate,
  cache,
}: ShopifyFetchParams<V>): Promise<T> {
  const env = getEnv()
  const endpoint = `https://${env.SHOPIFY_STORE_DOMAIN}/api/${env.SHOPIFY_API_VERSION}/graphql.json`

  const next: { tags?: string[]; revalidate?: number | false } = {}
  if (tags) next.tags = tags
  if (revalidate !== undefined) next.revalidate = revalidate

  let res: Response
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      ...(cache ? { cache } : {}),
      ...(Object.keys(next).length ? { next } : {}),
    })
  } catch (err) {
    throw new ShopifyError('Shopify 网络请求失败', err)
  }

  if (!res.ok) {
    throw new ShopifyError(`Shopify 返回 ${res.status}`, await res.text().catch(() => undefined))
  }

  const json = (await res.json()) as GraphQLResponse<T>
  if (json.errors?.length) {
    throw new ShopifyError(json.errors.map((e) => e.message).join('; '), json.errors)
  }
  if (!json.data) {
    throw new ShopifyError('Shopify 返回空数据')
  }
  return json.data
}
