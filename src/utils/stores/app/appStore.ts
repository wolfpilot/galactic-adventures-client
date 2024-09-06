import { create } from "zustand"
import { devtools } from "zustand/middleware"

// Types
import { type SiteSlice, createSiteSlice } from "@utils/stores/app/siteSlice"
import { type DebugSlice, createDebugSlice } from "@utils/stores/app/debugSlice"

export type StoreState = DebugSlice & SiteSlice

export const useAppBoundStore = create<StoreState>()(
  devtools((...args) => ({
    ...createDebugSlice(...args),
    ...createSiteSlice(...args),
  }))
)
