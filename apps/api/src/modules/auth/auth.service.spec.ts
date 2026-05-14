import { jest } from '@jest/globals'
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'
import type { ConfigService } from '@nestjs/config'

import { UserRole } from '../../common/enums/index.js'

const mockBcrypt = {
  hashSync: jest.fn<(s: string, r: number) => string>().mockReturnValue('hashed-password'),
  compareSync: jest.fn<(s: string, h: string) => boolean>(),
}

jest.unstable_mockModule('bcryptjs', () => ({
  __esModule: true,
  default: mockBcrypt,
}))

const { AuthService } = await import('./auth.service.js')

describe('AuthService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  }
  const jwtService = { signAsync: jest.fn<() => Promise<string>>().mockResolvedValue('jwt-token') }
  const configService = {
    get: jest.fn((key: string, defaultValue?: string) => {
      if (key === 'JWT_EXPIRES_IN') return '7d'
      return defaultValue
    }),
  }

  let service: InstanceType<typeof AuthService>

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
      service.register({ email: 'a@b.com', password: 'password12' }),
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

    expect(mockBcrypt.hashSync).toHaveBeenCalled()
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

  it('login 在邮箱不存在时抛出 NotFoundException', async () => {
    prisma.user.findUnique.mockResolvedValue(null)

    await expect(
      service.login({ email: 'missing@b.com', password: 'password12' }),
    ).rejects.toBeInstanceOf(NotFoundException)
  })

  it('login 在密码错误时抛出 UnauthorizedException', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      name: 'a',
      role: UserRole.VIEWER,
      passwordHash: 'hashed-password',
    })
    mockBcrypt.compareSync.mockReturnValue(false)

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
    mockBcrypt.compareSync.mockReturnValue(true)

    const result = await service.login({
      email: 'a@b.com',
      password: 'correct-pass',
    })

    expect(result.user.role).toBe(UserRole.ADMIN)
    expect(jwtService.signAsync).toHaveBeenCalled()
  })
})
