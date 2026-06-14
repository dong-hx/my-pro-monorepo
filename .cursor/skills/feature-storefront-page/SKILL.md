---
name: feature-storefront-page
description: 在 apps/web (Next.js 16 App Router Shopify headless storefront) 新增页面或功能的标准流程与约束。当在 apps/web 下新增/修改路由、页面、widgets、features、组件、Server Actions 或数据获取时使用。约束 RSC 读 / Server Actions 写 / Zustand 仅管 UI 状态、FSD 分层、组件归属与表单规范。
---

# feature-storefront-page

## 目标

在 `apps/web` 中新增一个可上线的 storefront 页面/功能，遵循 RSC 渲染、Server Actions 写入、FSD 分层与本仓库前端规则。

## 输入

- 页面/功能名称与路由路径
- 依赖的 Shopify 数据（product/collection/cart/search/metafields）
- 是否含表单或写操作（购物车、评价、newsletter、contact）

## 前置检查

- 确认路由路径不与现有 `src/app` 路由冲突。
- 确认所需 Shopify 查询/字段已在 `src/shared/shopify` 数据层封装；缺失则先补 fragment/query。
- 确认可复用组件：基础件查 `src/shared/ui`，通用工具(如 `cn`)查 `@repo/ui`。

## 步骤

1. 在 `src/app/<route>/page.tsx` 创建路由文件（薄）：默认 Server Component，仅做取数 + 组装 widgets。
2. 读数据：通过 `src/shared/shopify` 数据层（`shopifyFetch` + `next: { tags }`），禁止在组件内直接拼 fetch/axios。
3. 写数据：用 Server Actions（`features/<domain>/actions.ts`，`'use server'`），客户端配 `useOptimistic`；写后按需 `revalidateTag`。
4. UI 状态（抽屉/菜单/选中态）用 Zustand（`features/*/model` 或 `shared`），不要把服务端数据塞进 Zustand。
5. 表单用 `react-hook-form + zod`，schema 放 `features/<domain>/schemas`，Server Action 内用同一 schema 再校验一次。
6. 组件归属决策：
   - 业务组件(ProductCard/CartLine/PdpGallery 等) → `src/widgets` 或 `features/*`，禁止进 `packages/ui`。
   - storefront 品牌样式的展示/交互件 → `src/app/...` 之外的 `src/shared/ui`（带 clay/cream/sage token）。
   - 仅主题无关、跨应用通用的 → 才下沉 `packages/ui`（如 `cn`）。
7. 金额用 `Intl.NumberFormat` 按币种格式化，禁手拼 `$`。
8. 响应式：单套组件 + Tailwind 断点（`sm/md/lg/xl`），用 `hidden`/`md:` 切换形态，不做桌面/移动两套、不用 JS 判断屏宽（除非纯 CSS 无法表达）。
9. 补 Vitest 单测（mapper/schema/纯逻辑，配合 MSW mock Shopify）；核心流补 Playwright E2E。

## 输出检查

- 路由可访问，默认 RSC，客户端组件仅在需要交互处用 `'use client'`
- 组件层无直接 fetch/axios；数据访问集中在 `src/shared/shopify`
- FSD 分层正确，`shared` 不 import `features`，`features` 不 import `app`
- 业务组件未进入 `packages/ui`
- lint / lint:arch / test 通过

## 最小验证命令

- `pnpm --filter web lint`
- `pnpm --filter web lint:arch`
- `pnpm --filter web test`
