import 'reflect-metadata'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'
import { PrismaService } from './common/database/prisma.service.js'
import { AllExceptionsFilter } from './common/filters/http-exception.filter.js'
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://127.0.0.1:5173']
  app.enableCors({ origin: allowedOrigins, credentials: true })
  await app.get(PrismaService).enableShutdownHooks(app)

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000)

  Logger.log(`listening on ${await app.getUrl()}`, 'bootstrap')
}

void bootstrap()

