import type { LoginResponse, RegisterRequest } from '@repo/contracts'

import { httpClient } from '@/shared/api'

export async function postRegister(body: RegisterRequest): Promise<LoginResponse> {
  const { data } = await httpClient.post<LoginResponse>('/auth/register', body)
  return data
}
