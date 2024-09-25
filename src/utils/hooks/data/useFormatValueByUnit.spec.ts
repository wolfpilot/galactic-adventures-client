import { renderHook } from "@testing-library/react"

// Types
import { DistanceUnit, TemperatureUnit } from "@ts/global.types"

// Utils
import { usePersistBoundStore } from "@utils/stores"

import {
  useFormatDistanceUnit,
  useFormatSpeedUnit,
  useFormatTemperatureUnit,
  useFormatTemperatureToRange,
} from "./useFormatValueByUnit"

describe("useFormatDistanceUnit", () => {
  describe("given the default unit", () => {
    it("should return the original value and unit suffix", () => {
      const { result } = renderHook(() => useFormatDistanceUnit(1))

      expect(result.current).toBe("1km")
    })
  })

  describe("when the unit is not the default", () => {
    it("should return the converted value and unit suffix", () => {
      const { result: updateDistanceUnit } = renderHook(() =>
        usePersistBoundStore((state) => state.updateDistanceUnit)
      )
      updateDistanceUnit.current(DistanceUnit.miles)

      const { result } = renderHook(() => useFormatDistanceUnit(1))
      expect(result.current).toBe("0.62mi")
    })
  })

  describe("when the value is invalid", () => {
    const mockValues = [undefined, null, NaN, "test"]

    it.each(mockValues)("should return value is missing", (val) => {
      // @ts-expect-error Force-pass invalid type arguments
      const { result } = renderHook(() => useFormatDistanceUnit(val))
      expect(result.current).toBe("N/A")
    })
  })
})

describe("useFormatSpeedUnit", () => {
  describe("given the default unit", () => {
    it("should return the original value and unit suffix", () => {
      const { result } = renderHook(() => useFormatSpeedUnit(100))

      expect(result.current).toBe("100km/h")
    })
  })

  describe("when the unit is not the default", () => {
    it("should return the converted value and unit suffix", () => {
      const { result: updateDistanceUnit } = renderHook(() =>
        usePersistBoundStore((state) => state.updateDistanceUnit)
      )
      updateDistanceUnit.current(DistanceUnit.miles)

      const { result } = renderHook(() => useFormatSpeedUnit(100))
      expect(result.current).toBe("62.14mi/h")
    })
  })

  describe("when the value is invalid", () => {
    const mockValues = [undefined, null, NaN, "test"]

    it.each(mockValues)("should return N/A", (val) => {
      // @ts-expect-error Force-pass invalid type arguments
      const { result } = renderHook(() => useFormatSpeedUnit(val))
      expect(result.current).toBe("N/A")
    })
  })
})

describe("useFormatTemperatureUnit", () => {
  describe("given the default unit", () => {
    it("should return the original value and unit suffix", () => {
      const { result } = renderHook(() => useFormatTemperatureUnit(0))

      expect(result.current).toBe("0K")
    })
  })

  describe("when the unit is not the default", () => {
    it("should return the converted value and unit suffix", () => {
      const { result: updateTemperatureUnit } = renderHook(() =>
        usePersistBoundStore((state) => state.updateTemperatureUnit)
      )
      updateTemperatureUnit.current(TemperatureUnit.celsius)

      const { result } = renderHook(() => useFormatTemperatureUnit(0))
      expect(result.current).toBe("-273.15°C")
    })
  })

  describe("when the value is invalid", () => {
    const mockValues = [undefined, null, NaN, "test"]

    it.each(mockValues)("should return value is missing", (val) => {
      // @ts-expect-error Force-pass invalid type arguments
      const { result } = renderHook(() => useFormatTemperatureUnit(val))
      expect(result.current).toBe("N/A")
    })
  })
})

describe("useFormatTemperatureToRange", () => {
  describe("given both values are provided", () => {
    it("should return the temperature range", () => {
      const { result } = renderHook(() => useFormatTemperatureToRange(0, 100))

      expect(result.current).toBe("0K - 100K")
    })
  })

  describe("given both values are provided in a different unit type", () => {
    it("should return the temperature range", () => {
      const { result: updateTemperatureUnit } = renderHook(() =>
        usePersistBoundStore((state) => state.updateTemperatureUnit)
      )
      updateTemperatureUnit.current(TemperatureUnit.celsius)

      const { result } = renderHook(() =>
        useFormatTemperatureToRange(273.15, 373.15)
      )

      expect(result.current).toBe("0°C - 100°C")
    })
  })

  describe("when only the min temp is provided", () => {
    it("should return the minimum temperature", () => {
      const { result } = renderHook(() => useFormatTemperatureToRange(0, null))
      expect(result.current).toBe("≥ 0K")
    })
  })

  describe("when only the max temp is provided", () => {
    it("should return the maximum temperature", () => {
      const { result } = renderHook(() =>
        useFormatTemperatureToRange(null, 100)
      )
      expect(result.current).toBe("≤ 100K")
    })
  })

  describe("when the max temp is higher than the min", () => {
    it("should return null", () => {
      const { result } = renderHook(() => useFormatTemperatureToRange(100, 0))
      expect(result.current).toBe(null)
    })
  })

  describe("when neither values are provided", () => {
    it("should return value is missing", () => {
      const { result } = renderHook(() =>
        useFormatTemperatureToRange(null, null)
      )
      expect(result.current).toBe(null)
    })
  })
})
