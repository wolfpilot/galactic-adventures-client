import { create } from "zustand"
import { devtools } from "zustand/middleware"

// Types
import { type AppSlice, createAppSlice } from "@utils/stores/app/appSlice"

export type StoreState = AppSlice

export const useAppBoundStore = create<StoreState>()(
  devtools((...args) => ({
    ...createAppSlice(...args),
  }))
)
