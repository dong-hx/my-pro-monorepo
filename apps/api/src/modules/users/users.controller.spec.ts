import 'reflect-metadata'

import { ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { ExecutionContext } from '@nestjs/common'

import { UserRole } from '../../common/enums/index.js'
import { RolesGuard } from '../auth/guards/roles.guard.js'

describe('RolesGuard 权限校验（保护 UsersController）', () => {
  let guard: RolesGuard

  beforeEach(() => {
    const reflector = new Reflector()
    guard = new RolesGuard(reflector)
  })

  function buildContext(userRole: UserRole | undefined, handlerRoles: UserRole[]) {
    const handler = () => undefined
    Reflect.defineMetadata('roles', handlerRoles, handler)

    const classTarget = class FakeController {}
    return {
      getHandler: () => handler,
      getClass: () => classTarget,
      switchToHttp: () => ({
        getRequest: () => ({
          user: userRole ? { role: userRole } : undefined,
        }),
      }),
    } as unknown as ExecutionContext
  }

  it('ADMIN 角色允许访问 ADMIN 路由', () => {
    const ctx = buildContext(UserRole.ADMIN, [UserRole.ADMIN])
    expect(guard.canActivate(ctx)).toBe(true)
  })

  it('VIEWER 角色访问 ADMIN 路由被拒绝', () => {
    const ctx = buildContext(UserRole.VIEWER, [UserRole.ADMIN])
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException)
  })

  it('EDITOR 角色访问 ADMIN 路由被拒绝', () => {
    const ctx = buildContext(UserRole.EDITOR, [UserRole.ADMIN])
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException)
  })

  it('未登录 (无 user) 时被拒绝', () => {
    const ctx = buildContext(undefined, [UserRole.ADMIN])
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException)
  })

  it('EDITOR 角色访问 EDITOR 路由允许', () => {
    const ctx = buildContext(UserRole.EDITOR, [UserRole.EDITOR])
    expect(guard.canActivate(ctx)).toBe(true)
  })

  it('无角色要求时放行任何用户', () => {
    const ctx = buildContext(UserRole.VIEWER, [])
    expect(guard.canActivate(ctx)).toBe(true)
  })
})
