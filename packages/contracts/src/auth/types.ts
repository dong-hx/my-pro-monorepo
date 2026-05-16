import type { UserRole } from '../user/types.js'

/** 与 `UserRole` 同义，供 JWT / 鉴权语义使用 */
export type AuthRole = UserRole

export interface JwtPayload {
  sub: string
  email: string
  name: string
  role: AuthRole
  /** 区分 access / refresh token；access token 没有此字段 */
  type?: 'refresh'
}

export interface AuthUserView {
  id: string
  email: string
  name: string
  role: AuthRole
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: 'Bearer'
  expiresIn: number
  user: AuthUserView
}

export interface RefreshResponse {
  accessToken: string
  tokenType: 'Bearer'
  expiresIn: number
}

export type VerificationPurpose = 'register' | 'reset-password'

export interface SendCodeRequest {
  email: string
  purpose: VerificationPurpose
}

export interface SendCodeResponse {
  message: string
}

export interface RegisterRequest {
  email: string
  password: string
  code: string
  name?: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  code: string
  newPassword: string
}

export interface MessageResponse {
  message: string
}
