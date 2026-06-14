---
name: engineering-discipline
description: 本仓库通用工程纪律（superpowers 风格），适用于任何代码改动。当实现功能、修复 bug、重构或提交前使用。强调先方案后编码、小步推进、改完必跑验证、调 bug 先复现找根因、新增逻辑先补测试、遵守 monorepo 分层与 catalog 版本。
---

# engineering-discipline

## 目标

让每次改动都向最佳实践靠拢：可验证、最小化、可回滚、有测试。

## 前置检查

- 复杂或多步任务先列计划/todo，再动手。
- 改前先定位影响范围与受影响的 app/package。
- 确认依赖版本走 `catalog:`；新增依赖优先复用 workspace 内已有。

## 步骤

1. 先方案后编码：明确目标、边界、验收标准，再写代码。
2. 小步推进：每个可验证单元单独完成，避免一次性大改难以回滚。
3. 新增业务逻辑先补/同步单测（前端 Vitest、后端 Jest）。
4. 修 bug：先写能复现的测试用例，再定位根因修复（不打表面补丁）。
5. 遵守分层：`shared` 不 import `features`，`features` 不 import `app`；业务逻辑不进 `packages/ui`；应用间不互相依赖。
6. 改完立即跑验证命令，失败先修本次引入的问题，再考虑历史问题。

## 输出检查

- 改动范围最小、聚焦
- 关键逻辑有测试覆盖
- lint 与受影响应用的 test 通过
- 未引入额外警告，未违反 monorepo 分层与依赖规则

## 最小验证命令

- `pnpm lint`
- `pnpm --filter <app> test`
