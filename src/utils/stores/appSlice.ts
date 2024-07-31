import { type StateCreator } from "zustand"

export interface AppSlice {
  isNavOpen: boolean
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

// Setup
const initialState = {
  isNavOpen: false,
}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set
) => ({
  ...initialState,
  openNav: () => set(() => ({ isNavOpen: true })),
  closeNav: () => set(() => ({ isNavOpen: false })),
  toggleNav: () => set(({ isNavOpen }) => ({ isNavOpen: !isNavOpen })),
})
