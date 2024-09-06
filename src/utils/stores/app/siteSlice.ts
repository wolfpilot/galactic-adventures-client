import { type StateCreator } from "zustand"

// Types
import { Props as SiteBannerProps } from "@components/layout/Site/SiteBanner/types"

export interface SiteState {
  isNavOpen: boolean
  bannerData: SiteBannerProps | undefined
}

export interface SiteSlice extends SiteState {
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  updateBannerData: (val: SiteBannerProps) => void
}

// Setup
const initialState: SiteState = {
  isNavOpen: false,
  bannerData: undefined,
}

export const createSiteSlice: StateCreator<SiteSlice, [], [], SiteSlice> = (
  set
) => ({
  ...initialState,
  openNav: () => set(() => ({ isNavOpen: true })),
  closeNav: () => set(() => ({ isNavOpen: false })),
  toggleNav: () => set(({ isNavOpen }) => ({ isNavOpen: !isNavOpen })),
  updateBannerData: (val) => set(() => ({ bannerData: val })),
})
