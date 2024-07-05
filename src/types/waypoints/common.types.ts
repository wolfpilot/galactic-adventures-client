export type AtmosphereType = "None" | "Thick" | "Thin" | "Exotic"

export interface Atmosphere {
  type: AtmosphereType
  co2_pct: number | null
  n2_pct: number | null
  o2_pct: number | null
  ar_pct: number | null
  ch4_pct: number | null
  na_pct: number | null
  h2_pct: number | null
  he_pct: number | null
}
