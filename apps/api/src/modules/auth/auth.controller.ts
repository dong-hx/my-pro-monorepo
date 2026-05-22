import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import type {
  LoginResponseDto as LoginResponseModel,
  MessageResponseDto as MessageResponseModel,
  RefreshResponseDto as RefreshResponseModel,
} from '@repo/contracts/generated'

import { AuthService } from './auth.service.js'
import { LoginDto } from './dto/login.dto.js'
import { LoginResponseDto } from './dto/login-response.dto.js'
import { MessageResponseDto } from './dto/message-response.dto.js'
import { RefreshResponseDto } from './dto/refresh-response.dto.js'
import { RegisterDto } from './dto/register.dto.js'
import { SendCodeDto } from './dto/send-code.dto.js'
import { ResetPasswordDto } from './dto/reset-password.dto.js'
import { RefreshTokenDto } from './dto/refresh-token.dto.js'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MessageResponseDto })
  sendCode(@Body() dto: SendCodeDto): Promise<MessageResponseModel> {
    return this.authService.sendCode(dto.email, dto.purpose)
  }

  @Post('register')
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: LoginResponseDto })
  register(@Body() dto: RegisterDto): Promise<LoginResponseModel> {
    return this.authService.register(dto)
  }

  @Post('login')
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponseDto })
  login(@Body() dto: LoginDto): Promise<LoginResponseModel> {
    return this.authService.login(dto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RefreshResponseDto })
  refresh(@Body() dto: RefreshTokenDto): Promise<RefreshResponseModel> {
    return this.authService.refresh(dto.refreshToken)
  }

  @Post('reset-password')
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MessageResponseDto })
  resetPassword(@Body() dto: ResetPasswordDto): Promise<MessageResponseModel> {
    return this.authService.resetPassword(dto)
  }
}
