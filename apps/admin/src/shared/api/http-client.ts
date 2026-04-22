import { message } from 'antd'
import axios, { isAxiosError } from 'axios'

let authToken: string | null = null

/** 供登录 / 登出同步 Bearer，供后续受保护接口使用 */
export function setHttpAuthToken(token: string | null) {
  authToken = token
}

function responseBodyMessage(data: unknown): string | null {
  if (data === null || typeof data !== 'object' || !('message' in data)) {
    return null
  }
  const raw = (data as { message: unknown }).message
  if (raw === undefined || raw === null) {
    return null
  }
  if (Array.isArray(raw)) {
    const joined = raw.filter((x) => x != null && String(x).trim() !== '').map(String).join(', ')
    return joined || null
  }
  if (typeof raw === 'string') {
    return raw.trim() || null
  }
  return String(raw)
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

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error) && error.response) {
      const text = responseBodyMessage(error.response.data)
      if (text) {
        void message.error(text)
      }
    }
    return Promise.reject(error)
  },
)
