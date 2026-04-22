/**
 * 与 `packages/type` 保持同步（改共享类型时请同步改 `packages/type` 与本文件）。
 * 供 `paths["@repo/type"]` 指向此处，避免 rootDir 外引用与 .d.ts 运行时报错。
 */
export type UserRole = 'admin' | 'editor' | 'viewer'

export interface UserPublic {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface UserBrief {
  id: string
  name: string
  role: UserRole
}

export type AuthRole = 'admin' | 'editor' | 'viewer'

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
