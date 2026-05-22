import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { VerificationCodeService } from './verification-code.service.js'
import { JwtStrategy } from './strategies/jwt.strategy.js'

type JwtExpiresInput = `${number}${'s' | 'm' | 'h' | 'd'}`
const DEFAULT_JWT_EXPIRES_IN: JwtExpiresInput = '15m'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<JwtExpiresInput>(
            'JWT_EXPIRES_IN',
            DEFAULT_JWT_EXPIRES_IN,
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, VerificationCodeService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
