import type { SendCodeRequest, SendCodeResponse } from '@repo/contracts'

import { httpClient } from '@/shared/api'

export async function postSendCode(body: SendCodeRequest): Promise<SendCodeResponse> {
  const { data } = await httpClient.post<SendCodeResponse>('/auth/send-code', body)
  return data
}
