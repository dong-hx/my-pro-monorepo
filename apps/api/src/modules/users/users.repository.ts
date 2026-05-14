import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../common/database/prisma.service.js'
import type { CreateUserDto } from './dto/create-user.dto.js'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data })
  }

  findAll() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }
}
