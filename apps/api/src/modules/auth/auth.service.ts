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
import type { AuthUserView, JwtPayload, LoginResponse } from '@repo/contracts'
import type { LoginDto } from './dto/login.dto.js'
import type { RegisterDto } from './dto/register.dto.js'
import { parseJwtExpiresToSeconds } from './utils/parse-jwt-expires.js'

const BCRYPT_ROUNDS = 12

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<LoginResponse> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    })
    if (existing) {
      throw new ConflictException('该邮箱已被注册')
    }

    const passwordHash = bcrypt.hashSync(dto.password, BCRYPT_ROUNDS)
    const name =
      dto.name?.trim() ||
      dto.email.split('@')[0]?.slice(0, 80) ||
      '用户'

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        name,
        role: UserRole.VIEWER,
        passwordHash,
      },
    })

    return this.buildTokenResponse({
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

    if (!user) {
      throw new NotFoundException('该邮箱未注册')
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException('该账号未设置密码，无法使用密码登录')
    }

    const ok = bcrypt.compareSync(dto.password, user.passwordHash)
    if (!ok) {
      throw new UnauthorizedException('密码错误')
    }

    return this.buildTokenResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      role: this.assertRole(user.role),
    })
  }

  private assertRole(role: string): UserRole {
    const values = Object.values(UserRole) as string[]
    if (values.includes(role)) {
      return role as UserRole
    }
    return UserRole.VIEWER
  }

  private async buildTokenResponse(user: AuthUserView): Promise<LoginResponse> {
    const expiresInConfig = this.configService.get<string>('JWT_EXPIRES_IN', '7d')
    const expiresIn = parseJwtExpiresToSeconds(expiresInConfig)

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: expiresInConfig,
    })

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn,
      user,
    }
  }
}
