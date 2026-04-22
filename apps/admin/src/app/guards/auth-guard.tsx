import { Navigate, Outlet, useLocation } from 'react-router-dom'

import type { UserRole } from '@repo/type'

import { useAuthStore } from '@/features/auth/store/auth-store'

interface AuthGuardProps {
  requiredRole?: UserRole
}

const roleRank: Record<UserRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
}

export const AuthGuard = ({ requiredRole = 'viewer' }: AuthGuardProps) => {
  const location = useLocation()
  const currentUser = useAuthStore((state) => state.currentUser)

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (roleRank[currentUser.role] < roleRank[requiredRole]) {
    return <Navigate to="/forbidden" replace />
  }

  return <Outlet />
}
