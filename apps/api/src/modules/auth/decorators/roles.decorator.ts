import { SetMetadata } from '@nestjs/common'

import type { UserRole } from '../../../common/enums/index.js'

export const ROLES_KEY = 'roles'

/** 声明路由所需的最低角色（与 admin `AuthGuard` 的 `requiredRole` 语义一致） */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)
