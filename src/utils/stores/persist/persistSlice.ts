import { type StateCreator } from "zustand"

// Types
import { DistanceUnit, TemperatureUnit } from "@ts/global.types"

export interface PersistState {
  units: {
    distance: DistanceUnit
    temperature: TemperatureUnit
  }
}

export interface PersistSlice extends PersistState {
  updateDistanceUnit: (val: DistanceUnit) => void
  updateTemperatureUnit: (val: TemperatureUnit) => void
}

// Setup
const initialState: PersistState = {
  units: {
    distance: DistanceUnit.kilometres,
    temperature: TemperatureUnit.kelvin,
  },
}

export const createPersistSlice: StateCreator<
  PersistSlice,
  [["zustand/persist", unknown]],
  [],
  PersistSlice
> = (set) => ({
  ...initialState,
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
