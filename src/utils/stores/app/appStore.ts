import { create } from "zustand"
import { devtools } from "zustand/middleware"

// Types
import { type DebugSlice, createDebugSlice } from "@utils/stores/app/debugSlice"
import { type DataSlice, createDataSlice } from "@utils/stores/app/dataSlice"
import { type SiteSlice, createSiteSlice } from "@utils/stores/app/siteSlice"

export type StoreState = DebugSlice & DataSlice & SiteSlice

export const useAppBoundStore = create<StoreState>()(
  devtools((...args) => ({
    ...createDebugSlice(...args),
    ...createDataSlice(...args),
    ...createSiteSlice(...args),
  }))
)
