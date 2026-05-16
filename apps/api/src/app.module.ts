import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from './common/database/prisma.module.js'
import { validateEnv } from './common/env/env.validation.js'
import { MailerModule } from './common/mailer/mailer.module.js'
import { AuthModule } from './modules/auth/auth.module.js'
import { HealthModule } from './modules/health/health.module.js'
import { UsersModule } from './modules/users/users.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    MailerModule,
    HealthModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}

