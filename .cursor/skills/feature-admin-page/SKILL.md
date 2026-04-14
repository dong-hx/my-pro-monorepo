# feature-admin-page

## 目标

在 `apps/admin` 中新增一个可上线的业务页面，包含路由、权限、数据请求、表单和测试骨架。

## 输入

- 页面名称与路由路径
- 所需角色权限（admin/editor/viewer）
- 依赖的接口列表

## 前置检查

- 确认路由路径不与现有页面冲突。
- 确认接口已有后端实现或 mock 数据。
- 确认需要复用的组件是否已存在于 `@repo/ui`。

## 步骤

1. 在 `features/<domain>/pages` 创建页面组件。
2. 在 `app/router.tsx` 注册路由，并配置 `AuthGuard`。
3. 在 `features/<domain>/api` 创建 query/mutation hooks。
4. 若有输入表单，在 `features/<domain>/schemas` 定义 zod schema，页面中接入 RHF。
5. 为 schema 或关键逻辑补一条 Vitest 用例。

## 输出检查

- 页面可访问且权限生效
- 页面层无直接 axios 调用
- lint/test 通过

## 最小验证命令

- `pnpm --filter admin lint`
- `pnpm --filter admin test`
