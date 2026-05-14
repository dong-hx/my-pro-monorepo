import type { UserRole } from '../user/types.js'

/** 与 `UserRole` 同义，供 JWT / 鉴权语义使用 */
export type AuthRole = UserRole

export interface JwtPayload {
  sub: string
  email: string
  name: string
  role: AuthRole
}

export interface AuthUserView {
  id: string
  email: string
  name: string
  role: AuthRole
}

export interface LoginResponse {
  accessToken: string
  tokenType: 'Bearer'
  expiresIn: number
  user: AuthUserView
}
