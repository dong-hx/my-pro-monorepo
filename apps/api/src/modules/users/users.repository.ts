import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../common/database/prisma.service.js'
import type { CreateUserDto } from './dto/create-user.dto.js'

const OMIT_SENSITIVE = { passwordHash: true } as const

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data, omit: OMIT_SENSITIVE })
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      omit: OMIT_SENSITIVE,
    })
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id }, omit: OMIT_SENSITIVE })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }, omit: OMIT_SENSITIVE })
  }
}
