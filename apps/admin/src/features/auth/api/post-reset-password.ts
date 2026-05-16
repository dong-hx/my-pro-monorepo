import type { MessageResponse, ResetPasswordRequest } from '@repo/contracts'

import { httpClient } from '@/shared/api'

export async function postResetPassword(body: ResetPasswordRequest): Promise<MessageResponse> {
  const { data } = await httpClient.post<MessageResponse>('/auth/reset-password', body)
  return data
}
