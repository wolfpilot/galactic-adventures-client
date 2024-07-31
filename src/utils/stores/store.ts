import { create } from "zustand"
import { devtools } from "zustand/middleware"

// Types
import { type AppSlice, createAppSlice } from "@utils/stores/appSlice"

export type StoreState = AppSlice

export const useBoundStore = create<StoreState>()(
  devtools((...args) => ({
    ...createAppSlice(...args),
  }))
)
