import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'

type Role = 'admin' | 'editor' | 'viewer'

interface AuthGuardProps {
  requiredRole?: Role
}

const roleRank: Record<Role, number> = {
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
