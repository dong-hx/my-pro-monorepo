import type { LoginResponse } from '@repo/contracts'

import { httpClient } from '@/shared/api'

import type { LoginSchemaInput } from '../model/login.schema'

export async function postLogin(body: LoginSchemaInput): Promise<LoginResponse> {
  const { data } = await httpClient.post<LoginResponse>('/auth/login', body)
  return data
}
