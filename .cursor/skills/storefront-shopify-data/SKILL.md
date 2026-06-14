---
name: storefront-shopify-data
description: apps/web 中访问 Shopify Storefront GraphQL API 的数据层约束。当编写或修改 Shopify 查询/变更、shopifyFetch、GraphQL fragment、缓存 tag、购物车或评价等数据逻辑时使用。强制统一走 shopifyFetch（原生 fetch + next.tags，禁 axios）、fragment + Codegen 类型、按域打 tag、错误与空数据处理。
---

# storefront-shopify-data

## 目标

在 `apps/web` 中以统一、可缓存、强类型的方式访问 Shopify Storefront GraphQL API。

## 输入

- 需要的数据域（product/collection/cart/search/menu/page/metafields）
- 读还是写（读用 RSC，写用 Server Actions）

## 前置检查

- 确认环境变量已在 `src/shared/config/env.ts`（zod 校验）声明：`SHOPIFY_STORE_DOMAIN`、`SHOPIFY_STOREFRONT_ACCESS_TOKEN`、`SHOPIFY_API_VERSION`。
- 确认要查的字段是否已有 fragment，避免重复定义。

## 步骤

1. 所有请求统一走 `src/shared/shopify/client.ts` 的 `shopifyFetch`（原生 `fetch`，禁止引入 axios）。
2. 读操作传 `next: { tags: [...], revalidate }`，按域打 tag：商品用 `products`、集合用 `collections`，详情可加 `product:<handle>`。
3. 查询拆分为 `fragments/` + `queries/` + `mutations/`，类型由 GraphQL Codegen 生成，禁止手写 `any`。
4. 写操作（cart/评价提交）放 Server Actions；cart 的 `cartId` 存 httpOnly cookie；写后 `revalidateTag`。
5. 错误处理：检查 GraphQL `errors` 与 `userErrors`，向上抛可读错误；对 404/空数据返回结构化空值供页面渲染空态。
6. 评价：读取走 product metafields（Storefront API）；写入需 Admin API（服务端，经 `apps/api` 或受保护 Server Action），不要在客户端暴露 Admin token。
7. 金额字段保留 `amount + currencyCode`，展示层用 `Intl.NumberFormat` 格式化。

## 输出检查

- 无 axios；所有 Shopify 访问经 `shopifyFetch`
- 查询有对应 Codegen 类型，无裸 `any`
- 读操作带正确缓存 tag；写操作有 `revalidateTag`
- `userErrors`/空数据已处理
- 敏感 token 不出现在客户端 bundle

## 最小验证命令

- `pnpm --filter web codegen`
- `pnpm --filter web lint`
- `pnpm --filter web test`
