import { z } from 'zod'

// 服务端环境变量校验。lazy 解析，避免在缺失变量时影响构建期的静态分析。
const envSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().min(1, 'SHOPIFY_STORE_DOMAIN is required'),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1, 'SHOPIFY_STOREFRONT_ACCESS_TOKEN is required'),
  SHOPIFY_API_VERSION: z.string().min(1).default('2025-04'),
  SHOPIFY_REVALIDATION_SECRET: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
})

export type Env = z.infer<typeof envSchema>

let cached: Env | null = null

/** 构建/本地无 .env 时用于降级，避免静态分析阶段抛错 */
export function isShopifyConfigured(): boolean {
  return envSchema.safeParse(process.env).success
}

export function getEnv(): Env {
  if (cached) return cached
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `- ${i.path.join('.')}: ${i.message}`).join('\n')
    throw new Error(`环境变量校验失败，请检查 apps/web/.env.local：\n${issues}`)
  }
  cached = parsed.data
  return cached
}
