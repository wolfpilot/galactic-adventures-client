export type AtmosphereType = "None" | "Thick" | "Thin" | "Exotic"
export type AtmospherePct = number | null

export interface Atmosphere {
  type: AtmosphereType
  co2_pct: AtmospherePct
  n2_pct: AtmospherePct
  o2_pct: AtmospherePct
  ar_pct: AtmospherePct
  ch4_pct: AtmospherePct
  na_pct: AtmospherePct
  h2_pct: AtmospherePct
  he_pct: AtmospherePct
}

export type GeologicalActivity = "Volcanic" | "Tectonic" | "Tidal" | "Geyser"

export type PrecipitationLevel =
  | "None"
  | "Low"
  | "Moderate"
  | "High"
  | "Continuous"

export type SurfaceComposition =
  | "Gas"
  | "Terrestrial"
  | "Rocky"
  | "Desert"
  | "Water"
  | "Ice"
  | "Iron"
  | "Lava"
  | "Volcanic"
  | "Silicate"
