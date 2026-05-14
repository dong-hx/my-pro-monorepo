/**
 * 与 `packages/contracts` 保持同步（改共享类型时请同步改 `packages/contracts` 与本文件）。
 * 供本地编译阶段兜底使用，避免直接跨 `rootDir` 引用 workspace 包类型带来的解析问题。
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
