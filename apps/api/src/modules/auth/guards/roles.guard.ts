import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UserRole } from '../../../common/enums/index.js'
import { ROLES_KEY } from '../decorators/roles.decorator.js'
import { roleRank } from '../constants/role-rank.js'

interface RequestUser {
  role: UserRole
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles?.length) {
      return true
    }

    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>()
    const user = request.user

    if (!user?.role) {
      throw new ForbiddenException()
    }

    const required = requiredRoles.reduce(
      (max, role) => Math.max(max, roleRank[role]),
      0,
    )
    const current = roleRank[user.role]

    if (current < required) {
      throw new ForbiddenException()
    }

    return true
  }
}
