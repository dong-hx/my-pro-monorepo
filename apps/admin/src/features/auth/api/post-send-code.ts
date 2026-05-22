import type {
  SendCodeDto as SendCodeRequest,
  MessageResponseDto as SendCodeResponse,
} from '@repo/contracts/generated'

import { httpClient } from '@/shared/api'

export async function postSendCode(body: SendCodeRequest): Promise<SendCodeResponse> {
  const { data } = await httpClient.post<SendCodeResponse>('/auth/send-code', body)
  return data
}
