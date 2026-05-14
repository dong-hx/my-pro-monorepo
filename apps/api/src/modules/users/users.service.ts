import { Injectable } from '@nestjs/common'

import type { CreateUserDto } from './dto/create-user.dto.js'
import { UsersRepository } from './users.repository.js'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(payload: CreateUserDto) {
    return this.usersRepository.create(payload)
  }

  findAll() {
    return this.usersRepository.findAll()
  }
}
