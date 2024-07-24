// Types
import type { TemperatureUnit } from "@ts/global.types"
import type { AtmospherePct } from "@ts/waypoints/common.types"
import { ChemicalElements } from "@ts/enums.types"

// Utils
import { cleanEmpty } from "@utils/helpers/object.helpers"

export type FormatTemperature = (args: {
  min: number | null
  max: number | null
  unit?: TemperatureUnit
}) => string | null

export type FormatAtmosphere = (
  atmosphereElements: Record<string, AtmospherePct>
) => {
  elements: {
    symbol: string
    name: string | undefined
    pct: number
  }[]
  totalPct: number
  otherPct: number
}

export const formatTemperature: FormatTemperature = ({
  min,
  max,
  unit = "K",
}) =>
  min && max
    ? `${min.toLocaleString()} - ${max.toLocaleString()}${unit}`
    : min
      ? `≥ ${min.toLocaleString()}${unit}`
      : max
        ? `≤ ${max.toLocaleString()}${unit}`
        : null

export const formatAtmosphere: FormatAtmosphere = (atmosphereElements) => {
  const targetElements = cleanEmpty(atmosphereElements)
  const elements = Object.entries(targetElements).map(([key, value]) => {
    const symbol = key.replace("_pct", "") as keyof typeof ChemicalElements

    return {
      symbol,
      name: ChemicalElements[symbol],
      pct: value,
    }
  })

  const totalPct = Object.values(targetElements).reduce(
    (acc, val) => acc + val,
    0
  )
  const otherPct = +(100 - totalPct).toFixed(1)

  return {
    elements,
    totalPct,
    otherPct,
  }
}
