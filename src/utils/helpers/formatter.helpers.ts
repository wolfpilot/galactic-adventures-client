// Types
import type { AtmospherePct } from "@ts/waypoints/common.types"
import { ChemicalElements } from "@ts/enums.types"

// Utils
import { cleanEmpty } from "@utils/helpers/object.helpers"

export type FormatAtmosphereToPct = (
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

export const formatNumber = (value: number) => {
  if (isNaN(value)) return "N/A"

  return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export const formatPrice = ({
  currency,
  amount,
}: {
  currency: string
  amount: number
}) => {
  if (isNaN(amount)) return "N/A"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export const formatAtmosphereToPct: FormatAtmosphereToPct = (
  atmosphereElements
) => {
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
  const otherPct = +(100 - totalPct).toFixed(2)

  return {
    elements,
    totalPct,
    otherPct,
  }
}
