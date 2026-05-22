import type {
  MessageResponseDto as MessageResponse,
  ResetPasswordDto as ResetPasswordRequest,
} from '@repo/contracts/generated'

import { httpClient } from '@/shared/api'

export async function postResetPassword(body: ResetPasswordRequest): Promise<MessageResponse> {
  const { data } = await httpClient.post<MessageResponse>('/auth/reset-password', body)
  return data
}
