// Types
import { DistanceUnit, SpeedUnit, TemperatureUnit } from "@ts/global.types"

// Utils
import { useBoundStore } from "@utils/stores/store"
import { isNullish } from "@utils/helpers/comparison.helpers"
import {
  convertKilometresToMiles,
  convertKelvinToCelsius,
} from "@utils/helpers/number.helpers"

export const useFormatDistanceUnit = (value: number | null) => {
  const unit = useBoundStore((state) => state.units.distance)

  if (isNullish(value)) return "N/A"

  if (unit === DistanceUnit.kilometres) {
    return `${value}${DistanceUnit.kilometres}`
  }

  const newVal = convertKilometresToMiles(value)

  if (isNaN(newVal)) return "N/A"

  return `${newVal.toFixed(2)}${DistanceUnit.miles}`
}

export const useFormatSpeedUnit = (value: number | null) => {
  const unit = useBoundStore((state) => state.units.distance)

  if (isNullish(value)) return "N/A"

  if (unit === DistanceUnit.kilometres) {
    return `${value}${SpeedUnit.kilometresPerHour}`
  }

  const newVal = convertKilometresToMiles(value)

  if (isNaN(newVal)) return "N/A"

  return `${newVal.toFixed(2)}${SpeedUnit.milesPerHour}`
}

export const useFormatTemperatureUnit = (value: number | null) => {
  const unit = useBoundStore((state) => state.units.temperature)

  if (isNullish(value)) return "N/A"

  if (unit === TemperatureUnit.kelvin) {
    return `${value}${TemperatureUnit.kelvin}`
  }

  const newVal = convertKelvinToCelsius(value)

  if (isNaN(newVal)) return "N/A"

  return `${newVal.toFixed(2)}${TemperatureUnit.celsius}`
}

export const useFormatTemperatureToRange = (
  min: number | null,
  max: number | null
) => {
  const formattedMin = useFormatTemperatureUnit(min)
  const formattedMax = useFormatTemperatureUnit(max)

  return min && max
    ? `${formattedMin} - ${formattedMax}`
    : min
      ? `≥ ${formattedMin}`
      : max
        ? `≤ ${formattedMax}`
        : null
}
