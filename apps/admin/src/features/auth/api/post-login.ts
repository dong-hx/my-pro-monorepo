import type {
  LoginDto as LoginRequest,
  LoginResponseDto as LoginResponse,
} from '@repo/contracts/generated'

import { httpClient } from '@/shared/api'

import type { LoginSchemaInput } from '../model/login.schema'

export async function postLogin(body: LoginSchemaInput): Promise<LoginResponse> {
  const payload: LoginRequest = body
  const { data } = await httpClient.post<LoginResponse>('/auth/login', payload)
  return data
}
