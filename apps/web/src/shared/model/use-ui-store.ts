import { create } from 'zustand'

// 纯 UI 状态（抽屉/菜单开关），不存放服务端数据
interface UIState {
  cartOpen: boolean
  searchOpen: boolean
  mobileMenuOpen: boolean
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
}))
