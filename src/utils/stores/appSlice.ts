import { type StateCreator } from "zustand"

// Types
import { Props as SiteBannerProps } from "@components/layout/Site/SiteBanner/types"
import { DistanceUnit, TemperatureUnit } from "@ts/global.types"

export interface AppState {
  showDebugGrid: boolean
  isNavOpen: boolean
  bannerData: SiteBannerProps | undefined
  units: {
    distance: DistanceUnit
    temperature: TemperatureUnit
  }
}

export interface AppSlice extends AppState {
  updateShowDebugGrid: (val: boolean) => void
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  updateBannerData: (val: SiteBannerProps) => void
  updateDistanceUnit: (val: DistanceUnit) => void
  updateTemperatureUnit: (val: TemperatureUnit) => void
}

// Setup
const initialState: AppState = {
  showDebugGrid: false,
  isNavOpen: false,
  bannerData: undefined,
  units: {
    distance: DistanceUnit.kilometres,
    temperature: TemperatureUnit.kelvin,
  },
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
  updateDistanceUnit: (val) =>
    set((prev) => ({
      units: {
        ...prev.units,
        distance: val,
      },
    })),
  updateTemperatureUnit: (val) =>
    set((prev) => ({
      units: {
        ...prev.units,
        temperature: val,
      },
    })),
})
