// Types
import { DistanceUnit, SpeedUnit, TemperatureUnit } from "@ts/global.types"

// Utils
import { usePersistBoundStore } from "@utils/stores"
import { isNullish } from "@utils/helpers/comparison.helpers"
import { formatNumber } from "@utils/helpers/formatter.helpers"
import {
  convertKilometresToMiles,
  convertKelvinToCelsius,
} from "@utils/helpers/number.helpers"

// Exports
export const useFormatDistanceUnit = (value: number | null) => {
  const unit = usePersistBoundStore((state) => state.units.distance)

  if (isNullish(value) || isNaN(value)) return "N/A"

  if (unit === DistanceUnit.kilometres) {
    return `${formatNumber(value)}${DistanceUnit.kilometres}`
  }

  const newVal = convertKilometresToMiles(value)

  return `${formatNumber(newVal)}${DistanceUnit.miles}`
}

export const useFormatSpeedUnit = (value: number | null) => {
  const unit = usePersistBoundStore((state) => state.units.distance)

  if (isNullish(value) || isNaN(value)) return "N/A"

  if (unit === DistanceUnit.kilometres) {
    return `${formatNumber(value)}${SpeedUnit.kilometresPerHour}`
  }

  const newVal = convertKilometresToMiles(value)

  return `${formatNumber(newVal)}${SpeedUnit.milesPerHour}`
}

export const useFormatTemperatureUnit = (value: number | null) => {
  const unit = usePersistBoundStore((state) => state.units.temperature)

  if (isNullish(value) || isNaN(value)) return "N/A"

  if (unit === TemperatureUnit.kelvin) {
    return `${formatNumber(value)}${TemperatureUnit.kelvin}`
  }

  const newVal = convertKelvinToCelsius(value)

  return `${formatNumber(newVal)}${TemperatureUnit.celsius}`
}

export const useFormatTemperatureToRange = (
  min: number | null,
  max: number | null
) => {
  const formattedMin = useFormatTemperatureUnit(min)
  const formattedMax = useFormatTemperatureUnit(max)

  // Check for both null
  if (isNullish(min) && isNullish(max)) return null

  // Check for invalid params
  if (!isNullish(min) && !isNullish(max) && min >= max) return null

  return !isNullish(min) && !isNullish(max)
    ? `${formattedMin} - ${formattedMax}`
    : !isNullish(min)
      ? `≥ ${formattedMin}`
      : !isNullish(max)
        ? `≤ ${formattedMax}`
        : "N/A"
}
