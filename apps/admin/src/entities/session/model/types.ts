import type { UserRole } from '@repo/contracts/generated'

/** 客户端登录态简要用户（仅前端本地状态使用） */
export interface UserBrief {
  id: string
  name: string
  role: UserRole
}
