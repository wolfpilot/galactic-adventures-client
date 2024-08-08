import { type StateCreator } from "zustand"

export interface AppSlice {
  showDebugGrid: boolean
  isNavOpen: boolean
  updateShowDebugGrid: (val: boolean) => void
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

// Setup
const initialState = {
  showDebugGrid: false,
  isNavOpen: false,
}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set
) => ({
  ...initialState,
  updateShowDebugGrid: (val) => set(() => ({ showDebugGrid: val })),
  openNav: () => set(() => ({ isNavOpen: true })),
  closeNav: () => set(() => ({ isNavOpen: false })),
  toggleNav: () => set(({ isNavOpen }) => ({ isNavOpen: !isNavOpen })),
})
