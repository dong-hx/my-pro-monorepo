import type { LoginResponseDto as LoginResponse } from '@repo/contracts/generated'
import { create } from 'zustand'

import { setHttpAuthToken } from '@/shared/api'
import { AUTH_STORAGE_KEYS } from '@/shared/config'

import type { UserBrief } from './types'

function readUser(): UserBrief | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEYS.USER)
    return raw ? (JSON.parse(raw) as UserBrief) : null
  } catch {
    return null
  }
}

function readAccessToken(): string | null {
  return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
}

function persistSession(accessToken: string, refreshToken: string, user: UserBrief) {
  localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken)
  localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user))
}

function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(AUTH_STORAGE_KEYS.USER)
}

interface AuthState {
  accessToken: string | null
  currentUser: UserBrief | null
  setAuthFromLogin: (response: LoginResponse) => void
  logout: () => void
}

const restoredToken = readAccessToken()
if (restoredToken) {
  setHttpAuthToken(restoredToken)
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: restoredToken,
  currentUser: readUser(),

  setAuthFromLogin: (response) => {
    const user: UserBrief = {
      id: response.user.id,
      name: response.user.name,
      role: response.user.role,
    }
    setHttpAuthToken(response.accessToken)
    persistSession(response.accessToken, response.refreshToken, user)
    set({ accessToken: response.accessToken, currentUser: user })
  },

  logout: () => {
    setHttpAuthToken(null)
    clearSession()
    set({ accessToken: null, currentUser: null })
  },
}))
