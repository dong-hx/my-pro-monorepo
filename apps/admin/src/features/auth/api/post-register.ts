import type {
  LoginResponseDto as LoginResponse,
  RegisterDto as RegisterRequest,
} from '@repo/contracts/generated'

import { httpClient } from '@/shared/api'

export async function postRegister(body: RegisterRequest): Promise<LoginResponse> {
  const { data } = await httpClient.post<LoginResponse>('/auth/register', body)
  return data
}
