import { ConflictException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcryptjs'

import { UserRole } from '../users/dto/create-user.dto.js'
import { AuthService } from './auth.service.js'

jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: {
    hashSync: jest.fn().mockReturnValue('hashed-password'),
    compareSync: jest.fn(),
  },
}))

describe('AuthService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  }
  const jwtService = { signAsync: jest.fn().mockResolvedValue('jwt-token') }
  const configService = {
    get: jest.fn((key: string, defaultValue?: string) => {
      if (key === 'JWT_EXPIRES_IN') {
        return '7d'
      }
      return defaultValue
    }),
  }

  let service: AuthService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new AuthService(
      prisma as never,
      jwtService as unknown as JwtService,
      configService as unknown as ConfigService,
    )
  })

  it('register 在邮箱已存在时抛出 ConflictException', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1' })

    await expect(
      service.register({
        email: 'a@b.com',
        password: 'password12',
      }),
    ).rejects.toBeInstanceOf(ConflictException)

    expect(prisma.user.create).not.toHaveBeenCalled()
  })

  it('register 创建 viewer 用户并返回 token', async () => {
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.user.create.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      name: 'a',
      role: UserRole.VIEWER,
    })

    const result = await service.register({
      email: 'A@b.com',
      password: 'password12',
      name: 'Alice',
    })

    expect(bcrypt.hashSync).toHaveBeenCalled()
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: 'a@b.com',
        name: 'Alice',
        role: UserRole.VIEWER,
        passwordHash: 'hashed-password',
      }),
    })
    expect(result.accessToken).toBe('jwt-token')
    expect(result.user.role).toBe(UserRole.VIEWER)
  })

  it('login 在密码错误时抛出 UnauthorizedException', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      name: 'a',
      role: UserRole.VIEWER,
      passwordHash: 'hashed-password',
    })
    ;(bcrypt.compareSync as jest.Mock).mockReturnValue(false)

    await expect(
      service.login({ email: 'a@b.com', password: 'wrong-pass' }),
    ).rejects.toBeInstanceOf(UnauthorizedException)
  })

  it('login 在校验通过时颁发 token', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      name: 'Alice',
      role: UserRole.ADMIN,
      passwordHash: 'hashed-password',
    })
    ;(bcrypt.compareSync as jest.Mock).mockReturnValue(true)

    const result = await service.login({
      email: 'a@b.com',
      password: 'correct-pass',
    })

    expect(result.user.role).toBe(UserRole.ADMIN)
    expect(jwtService.signAsync).toHaveBeenCalled()
  })
})
