import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcryptjs'

import { PrismaService } from '../../common/database/prisma.service.js'
import { UserRole } from '../../common/enums/index.js'
import type {
  AuthUserView,
  JwtPayload,
  LoginResponse,
  MessageResponse,
  RefreshResponse,
  VerificationPurpose,
} from '@repo/contracts'
import type { LoginDto } from './dto/login.dto.js'
import type { RegisterDto } from './dto/register.dto.js'
import type { ResetPasswordDto } from './dto/reset-password.dto.js'
import { parseJwtExpiresToSeconds } from './utils/parse-jwt-expires.js'
import { VerificationCodeService } from './verification-code.service.js'

const BCRYPT_ROUNDS = 12
const REFRESH_TOKEN_EXPIRES = '30d'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  async sendCode(
    email: string,
    purpose: VerificationPurpose,
  ): Promise<MessageResponse> {
    const normalizedEmail = email.toLowerCase()

    await this.assertEmailForPurpose(normalizedEmail, purpose)
    await this.verificationCodeService.send(normalizedEmail, purpose)

    return { message: '验证码已发送，请查收邮箱' }
  }

  async register(dto: RegisterDto): Promise<LoginResponse> {
    const normalizedEmail = dto.email.toLowerCase()

    await this.verificationCodeService.verify(normalizedEmail, dto.code, 'register')

    const existing = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    })
    if (existing) {
      throw new ConflictException('该邮箱已被注册')
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS)
    const name =
      dto.name?.trim() ||
      normalizedEmail.split('@')[0]?.slice(0, 80) ||
      '用户'

    const user = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        name,
        role: UserRole.VIEWER,
        passwordHash,
      },
    })

    return this.buildLoginResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      role: this.assertRole(user.role),
    })
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    })

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('邮箱或密码错误')
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash)
    if (!ok) {
      throw new UnauthorizedException('邮箱或密码错误')
    }

    return this.buildLoginResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      role: this.assertRole(user.role),
    })
  }

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const secret = this.configService.getOrThrow<string>('JWT_SECRET')

    let payload: JwtPayload
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret,
      })
    } catch {
      throw new UnauthorizedException('refreshToken 无效或已过期，请重新登录')
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('无效的 token 类型')
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    })
    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }

    const expiresInConfig = this.configService.get<string>('JWT_EXPIRES_IN', '15m')
    const expiresIn = parseJwtExpiresToSeconds(expiresInConfig)

    const newPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: this.assertRole(user.role),
    }

    const accessToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: expiresInConfig,
    })

    return { accessToken, tokenType: 'Bearer', expiresIn }
  }

  async resetPassword(dto: ResetPasswordDto): Promise<MessageResponse> {
    const normalizedEmail = dto.email.toLowerCase()

    await this.verificationCodeService.verify(normalizedEmail, dto.code, 'reset-password')

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    })
    if (!user) {
      throw new NotFoundException('该邮箱未注册')
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS)
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    })

    return { message: '密码重置成功，请使用新密码登录' }
  }

  private async assertEmailForPurpose(
    email: string,
    purpose: VerificationPurpose,
  ): Promise<void> {
    const existing = await this.prisma.user.findUnique({
      where: { email },
    })

    if (purpose === 'register' && existing) {
      throw new ConflictException('该邮箱已被注册')
    }

    if (purpose === 'reset-password' && !existing) {
      throw new NotFoundException('该邮箱未注册')
    }
  }

  private assertRole(role: string): UserRole {
    const values = Object.values(UserRole) as string[]
    if (values.includes(role)) {
      return role as UserRole
    }
    return UserRole.VIEWER
  }

  private async buildLoginResponse(user: AuthUserView): Promise<LoginResponse> {
    const expiresInConfig = this.configService.get<string>('JWT_EXPIRES_IN', '15m')
    const expiresIn = parseJwtExpiresToSeconds(expiresInConfig)

    const accessPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }

    const refreshPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      type: 'refresh' as const,
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, { expiresIn: expiresInConfig }),
      this.jwtService.signAsync(refreshPayload, { expiresIn: REFRESH_TOKEN_EXPIRES }),
    ])

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn,
      user,
    }
  }
}
