# @repo/contracts

统一类型契约包，仅保留跨应用共享的协议与公共响应包装：

- `@repo/contracts/generated`：OpenAPI 自动生成协议类型（请求/响应真相）
- `@repo/contracts`（root）：仅导出 `common` 公共包装类型（如 `ApiResponse`）

## 使用约定

- 请求/响应协议类型统一使用 `@repo/contracts/generated`
- 应用内业务类型（如前端 store 的 `UserBrief`、后端鉴权 payload）就地放在各自应用中
- `@repo/contracts` 不再承载 `auth/user` 业务语义类型，避免与 generated 重复维护

## 生成流程

1. 启动 API（确保 `docs-json` 可访问）
2. 运行：

```bash
pnpm --filter @repo/contracts openapi:generate
```

可通过环境变量覆盖 OpenAPI 地址：

```bash
OPENAPI_JSON_URL=http://127.0.0.1:3001/docs-json pnpm --filter @repo/contracts openapi:generate
```
