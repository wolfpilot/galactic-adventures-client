import { type StateCreator } from "zustand"

export interface DataState {
  isLoading: boolean
}

export interface DataSlice extends DataState {
  updateIsLoading: (val: boolean) => void
}

// Setup
const initialState: DataState = {
  isLoading: true,
}

export const createDataSlice: StateCreator<DataSlice, [], [], DataSlice> = (
  set
) => ({
  ...initialState,
  updateIsLoading: (val) => set(() => ({ isLoading: val })),
})
