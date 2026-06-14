import type { CodegenConfig } from '@graphql-codegen/cli'

/**
 * 运行前需在 apps/web/.env.local 配置：
 *   SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_API_VERSION
 * 然后执行：pnpm --filter web codegen
 *
 * 当前数据层使用手写类型（src/shared/shopify/types.ts）。
 * 接入 codegen 后可逐步替换为生成类型，并将本文件的 generates 指向 generated/。
 */
const domain = process.env.SHOPIFY_STORE_DOMAIN
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = process.env.SHOPIFY_API_VERSION ?? '2025-04'

const config: CodegenConfig = {
  overwrite: true,
  schema: domain
    ? {
        [`https://${domain}/api/${apiVersion}/graphql.json`]: {
          headers: { 'X-Shopify-Storefront-Access-Token': token ?? '' },
        },
      }
    : [],
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/shared/shopify/generated/': {
      preset: 'client',
      config: { useTypeImports: true },
    },
  },
}

export default config
