import type { UserRole } from '@repo/contracts/generated'

export interface JwtPayload {
  sub: string
  email: string
  name: string
  role: UserRole
  /** 区分 access / refresh token；access token 没有此字段 */
  type?: 'refresh'
}
