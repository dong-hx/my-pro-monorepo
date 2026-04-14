# refactor-ui-component

## 目标

把重复 UI 从业务页面抽离到 `packages/ui`，形成稳定复用组件。

## 输入

- 待抽离组件所在页面
- 目标组件 API（props、事件、样式变量）

## 前置检查

- 先标记业务耦合点（请求、路由、权限）并移除后再抽组件。
- 组件 props 命名与语义优先对齐现有 `@repo/ui` 风格。

## 步骤

1. 在 `packages/ui/src/components` 创建组件文件。
2. 在 `packages/ui/src/index.ts` 暴露导出。
3. 组件仅保留展示与交互，不包含业务请求逻辑。
4. 在业务页面替换为 `@repo/ui` 引用。
5. 验证样式与交互保持一致。

## 输出检查

- 组件可被多个应用复用
- 组件 API 清晰且类型完整
- 无业务耦合

## 最小验证命令

- `pnpm --filter @repo/ui lint`
- `pnpm --filter admin lint`
