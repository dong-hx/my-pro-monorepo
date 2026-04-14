import { create } from 'zustand'

type Role = 'admin' | 'editor' | 'viewer'

interface CurrentUser {
  id: string
  name: string
  role: Role
}

interface AuthState {
  currentUser: CurrentUser | null
  loginAsDemoUser: (role?: Role) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  loginAsDemoUser: (role = 'admin') =>
    set({
      currentUser: {
        id: 'demo-user-id',
        name: 'Demo User',
        role,
      },
    }),
  logout: () => set({ currentUser: null }),
}))
