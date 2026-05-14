import { UserRole } from '../../../common/enums/index.js'

/** 与 `apps/admin` 中 `AuthGuard` 的 `roleRank` 一致 */
export const roleRank: Record<UserRole, number> = {
  [UserRole.VIEWER]: 1,
  [UserRole.EDITOR]: 2,
  [UserRole.ADMIN]: 3,
}
