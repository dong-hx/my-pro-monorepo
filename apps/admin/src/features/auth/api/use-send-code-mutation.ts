import { useMutation } from '@tanstack/react-query'

import { postSendCode } from './post-send-code'

export function useSendCodeMutation() {
  return useMutation({ mutationFn: postSendCode })
}
