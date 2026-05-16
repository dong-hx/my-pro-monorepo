import { useMutation } from '@tanstack/react-query'

import { postResetPassword } from './post-reset-password'

export function useResetPasswordMutation() {
  return useMutation({ mutationFn: postResetPassword })
}
