import { type StateCreator } from "zustand"

export interface DebugState {
  showDebugGrid: boolean
}

export interface DebugSlice extends DebugState {
  updateShowDebugGrid: (val: boolean) => void
}

// Setup
const initialState: DebugState = {
  showDebugGrid: false,
}

export const createDebugSlice: StateCreator<DebugSlice, [], [], DebugSlice> = (
  set
) => ({
  ...initialState,
  updateShowDebugGrid: (val) => set(() => ({ showDebugGrid: val })),
})
