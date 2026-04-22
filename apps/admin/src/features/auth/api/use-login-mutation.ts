import { useMutation } from '@tanstack/react-query'

import { postLogin } from './post-login'

export function useLoginMutation() {
  return useMutation({
    mutationFn: postLogin,
  })
}
