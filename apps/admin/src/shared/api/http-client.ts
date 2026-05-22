import { message } from 'antd'

import type { ApiErrorResponse, ApiResponse } from '@repo/contracts'
import type { RefreshResponseDto as RefreshResponse } from '@repo/contracts/generated'
import axios, { type AxiosRequestConfig, isAxiosError } from 'axios'

import { AUTH_STORAGE_KEYS } from '../config'

let authToken: string | null = null

export function setHttpAuthToken(token: string | null) {
  authToken = token
}

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:3001/api/',
  timeout: 10_000,
})

httpClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

/* -------- silent refresh state -------- */
let refreshing: Promise<string | null> | null = null

const refreshClient = axios.create({
  baseURL: httpClient.defaults.baseURL,
  timeout: 10_000,
})

async function tryRefresh(): Promise<string | null> {
  const rt = localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
  if (!rt) return null

  try {
    const { data } = await refreshClient.post<ApiResponse<RefreshResponse>>('auth/refresh', {
      refreshToken: rt,
    })

    const payload = data?.code === 0 ? data.data : null
    if (!payload?.accessToken) return null

    authToken = payload.accessToken
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, payload.accessToken)
    return payload.accessToken
  } catch {
    return null
  }
}

function forceLogout() {
  authToken = null
  localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(AUTH_STORAGE_KEYS.USER)

  const { pathname } = window.location
  if (pathname !== '/login' && pathname !== '/register') {
    window.location.href = '/login'
  }
}

httpClient.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse
    if (body && body.code === 0) {
      response.data = body.data
    }
    return response
  },
  async (error: unknown) => {
    if (!isAxiosError(error) || !error.response || !error.config) {
      return Promise.reject(error)
    }

    const originalConfig = error.config as AxiosRequestConfig & { _retried?: boolean }

    if (error.response.status === 401 && !originalConfig._retried) {
      originalConfig._retried = true

      if (!refreshing) {
        refreshing = tryRefresh().finally(() => {
          refreshing = null
        })
      }
      const newToken = await refreshing

      if (newToken) {
        originalConfig.headers = {
          ...originalConfig.headers,
          Authorization: `Bearer ${newToken}`,
        }
        return httpClient(originalConfig)
      }

      forceLogout()
      return Promise.reject(error)
    }

    const body = error.response.data as ApiErrorResponse | undefined
    const text = body?.message
    if (text) {
      void message.error(text)
    }

    return Promise.reject(error)
  },
)
