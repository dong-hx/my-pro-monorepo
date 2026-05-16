import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import type { Response } from 'express'

import type { ApiErrorResponse } from '@repo/contracts'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<{ url: string }>()

    let statusCode: number
    let message: string

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus()
      const res = exception.getResponse()
      if (typeof res === 'string') {
        message = res
      } else {
        const obj = res as Record<string, unknown>
        const raw = obj.message
        message = Array.isArray(raw)
          ? raw.filter(Boolean).map(String).join(', ')
          : typeof raw === 'string'
            ? raw
            : exception.message
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      message = '服务器内部错误'
      this.logger.error(exception)
    }

    const body: ApiErrorResponse = {
      code: statusCode,
      message,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(statusCode).json(body)
  }
}
