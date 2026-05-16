import { useMutation } from '@tanstack/react-query'

import { postRegister } from './post-register'

export function useRegisterMutation() {
  return useMutation({ mutationFn: postRegister })
}
