/**
 * 与 `packages/type/auth/auth.types.ts` 保持同步（改共享类型时请两边一起改）。
 * 用于在 `rootDir: "src"` 下解析 `@repo/type`，避免把 packages 拉进编译根导致 dist 错乱。
 */
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
