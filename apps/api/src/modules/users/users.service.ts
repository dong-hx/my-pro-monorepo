import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../common/database/prisma.service.js'
import { CreateUserDto } from './dto/create-user.dto.js'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(payload: CreateUserDto) {
    return this.prisma.user.create({
      data: payload,
    })
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}
