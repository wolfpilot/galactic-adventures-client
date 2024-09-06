import { create } from "zustand"
import { devtools, persist, createJSONStorage } from "zustand/middleware"

// Types
import {
  type PersistSlice,
  createPersistSlice,
} from "@utils/stores/persist/persistSlice"

export type StoreState = PersistSlice

export const usePersistBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...args) => ({
        ...createPersistSlice(...args),
      }),
      {
        name: "settings-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
