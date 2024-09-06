import { type StateCreator } from "zustand"

// Types
import { Props as SiteBannerProps } from "@components/layout/Site/SiteBanner/types"

export interface AppState {
  showDebugGrid: boolean
  isNavOpen: boolean
  bannerData: SiteBannerProps | undefined
}

export interface AppSlice extends AppState {
  updateShowDebugGrid: (val: boolean) => void
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  updateBannerData: (val: SiteBannerProps) => void
}

// Setup
const initialState: AppState = {
  showDebugGrid: false,
  isNavOpen: false,
  bannerData: undefined,
}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set
) => ({
  ...initialState,
  updateShowDebugGrid: (val) => set(() => ({ showDebugGrid: val })),
  openNav: () => set(() => ({ isNavOpen: true })),
  closeNav: () => set(() => ({ isNavOpen: false })),
  toggleNav: () => set(({ isNavOpen }) => ({ isNavOpen: !isNavOpen })),
  updateBannerData: (val) => set(() => ({ bannerData: val })),
})
