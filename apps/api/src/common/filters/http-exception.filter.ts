import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import type { Response } from 'express'

interface ErrorResponseBody {
  statusCode: number
  message: string | string[]
  error: string
  timestamp: string
  path: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<{ url: string }>()

    let statusCode: number
    let message: string | string[]
    let error: string

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus()
      const res = exception.getResponse()
      if (typeof res === 'string') {
        message = res
        error = exception.name
      } else {
        const obj = res as Record<string, unknown>
        message = (obj.message as string | string[]) ?? exception.message
        error = (obj.error as string) ?? exception.name
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      message = '服务器内部错误'
      error = 'Internal Server Error'
      this.logger.error(exception)
    }

    const body: ErrorResponseBody = {
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(statusCode).json(body)
  }
}
