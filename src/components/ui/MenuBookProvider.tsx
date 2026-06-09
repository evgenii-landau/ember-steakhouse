'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import MenuModal from '@/components/ui/MenuModal'

interface MenuBookContextValue {
  open: boolean
  openMenu: () => void
  closeMenu: () => void
}

const MenuBookContext = createContext<MenuBookContextValue | null>(null)

export function MenuBookProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openMenu = () => setOpen(true)
  const closeMenu = () => setOpen(false)

  return (
    <MenuBookContext.Provider value={{ open, openMenu, closeMenu }}>
      {children}
      <MenuModal open={open} onClose={closeMenu} />
    </MenuBookContext.Provider>
  )
}

export function useMenuBook(): MenuBookContextValue {
  const ctx = useContext(MenuBookContext)
  if (!ctx) {
    throw new Error('useMenuBook must be used within a MenuBookProvider')
  }
  return ctx
}
