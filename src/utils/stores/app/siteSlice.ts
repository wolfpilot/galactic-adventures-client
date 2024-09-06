import { type StateCreator } from "zustand"

// Types
import { Props as SiteBannerProps } from "@components/layout/Site/SiteBannerNews/types"

export interface SiteState {
  isNavOpen: boolean
  bannerNewsData: SiteBannerProps | undefined
}

export interface SiteSlice extends SiteState {
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  updateBannerNewsData: (val: SiteBannerProps) => void
}

// Setup
const initialState: SiteState = {
  isNavOpen: false,
  bannerNewsData: undefined,
}

export const createSiteSlice: StateCreator<SiteSlice, [], [], SiteSlice> = (
  set
) => ({
  ...initialState,
  openNav: () => set(() => ({ isNavOpen: true })),
  closeNav: () => set(() => ({ isNavOpen: false })),
  toggleNav: () => set(({ isNavOpen }) => ({ isNavOpen: !isNavOpen })),
  updateBannerNewsData: (val) => set(() => ({ bannerNewsData: val })),
})
