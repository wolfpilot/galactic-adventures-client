// Types
import type { WaypointBase } from "../waypoint.types.js"
import type { Atmosphere } from "../common.types.js"
import type {
  SurfaceComposition,
  GeologicalActivity,
  PrecipitationLevel,
} from "@ts/waypoints/common.types.js"

export type PlanetSize = "Supergiant" | "Giant" | "Super" | "Standard" | "Dwarf"

export interface PlanetDetails {
  is_habitable: boolean
  size: PlanetSize
  composition: SurfaceComposition
  geological_activity: GeologicalActivity
  diameter_km: number
  surface_temp_avg_k: number
  day_length_h: number
  orbital_period_d: number
  gravity_n: number
  wind_speed_avg_kmh: number
  wind_gust_max_kmh: number
  precipitation_level: PrecipitationLevel
  precipitation_types: string[]
  weather_alerts: string[]
  atmosphere: Atmosphere | null
}

export interface Planet extends WaypointBase {
  category: "Planet"
  details: PlanetDetails | null
}
