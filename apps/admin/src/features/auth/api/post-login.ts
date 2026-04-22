import type { LoginResponse } from '@repo/type'

import { httpClient } from '@/shared/api/http-client'

import type { LoginSchemaInput } from '../schemas/login.schema'

export async function postLogin(body: LoginSchemaInput): Promise<LoginResponse> {
  const { data } = await httpClient.post<LoginResponse>('/auth/login', body)
  return data
}
