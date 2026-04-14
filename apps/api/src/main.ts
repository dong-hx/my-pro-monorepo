import 'reflect-metadata'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'
import { PrismaService } from './common/database/prisma.service.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.enableCors()
  await app.get(PrismaService).enableShutdownHooks(app)

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000)

  Logger.log(`listening on ${await app.getUrl()}`, 'bootstrap')
}

void bootstrap()

