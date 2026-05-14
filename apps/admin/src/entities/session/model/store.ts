import { create } from 'zustand'

import type { LoginResponse, UserBrief } from '@repo/contracts'

import { setHttpAuthToken } from '@/shared/api/http-client'

interface AuthState {
  accessToken: string | null
  currentUser: UserBrief | null
  setAuthFromLogin: (response: LoginResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  currentUser: null,
  setAuthFromLogin: (response) => {
    setHttpAuthToken(response.accessToken)
    set({
      accessToken: response.accessToken,  
      currentUser: {
        id: response.user.id,
        name: response.user.name,
        role: response.user.role,
      },
    })
  },
  logout: () => {
    setHttpAuthToken(null)
    set({ accessToken: null, currentUser: null })
  },
}))
