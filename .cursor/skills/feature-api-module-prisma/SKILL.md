# feature-api-module-prisma

## 目标

在 `apps/api` 中新增一个领域模块，遵循 NestJS 分层并接入 Prisma。

## 输入

- 领域名称（如 users/orders）
- 实体字段与校验规则
- 是否需要分页与筛选

## 前置检查

- 确认领域命名与数据库表命名一致（单数模型、复数资源）。
- 先确认是否复用已有模块能力，避免重复建模。

## 步骤

1. 在 `prisma/schema.prisma` 增加模型。
2. 生成并执行 migration（本地）。
3. 创建 `modules/<domain>/` 下的 controller/service/dto/module。
4. 在 service 中通过 `PrismaService` 实现 CRUD；若出现复杂查询与聚合，拆分 `repository`。
5. 为 controller 或 service 补 Jest 测试。

## 输出检查

- `AppModule` 已挂载模块
- 请求参数已通过 DTO 校验
- 数据访问未绕过 PrismaService

## 最小验证命令

- `pnpm --filter api prisma:generate`
- `pnpm --filter api lint`
- `pnpm --filter api test`
