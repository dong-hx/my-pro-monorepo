import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { Roles } from '../auth/decorators/roles.decorator.js'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js'
import { RolesGuard } from '../auth/guards/roles.guard.js'
import { UserRole } from '../../common/enums/index.js'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UsersService } from './users.service.js'

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll()
  }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload)
  }
}
