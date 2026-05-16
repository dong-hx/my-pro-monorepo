/** 统一成功响应 */
export interface ApiResponse<T = unknown> {
  code: 0
  message: string
  data: T
}

/** 统一错误响应 */
export interface ApiErrorResponse {
  code: number
  message: string
  data: null
  timestamp: string
  path: string
}
