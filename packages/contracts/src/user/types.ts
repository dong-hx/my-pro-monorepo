/** 与 API `User` 模型及 Nest `UserRole` 枚举取值一致 */
export type UserRole = 'admin' | 'editor' | 'viewer'

/** 列表 / 详情 API 返回形态（JSON 序列化后日期为 ISO 字符串） */
export interface UserPublic {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

/** 客户端登录态简要用户（如 admin auth store） */
export interface UserBrief {
  id: string
  name: string
  role: UserRole
}
