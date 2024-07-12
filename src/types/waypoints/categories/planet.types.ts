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
  geological_activity: GeologicalActivity[] | null
  diameter_km: number
  surface_temp_avg_k: number
  day_length_h: number
  orbital_period_d: number
  gravity_n: number
  wind_speed_avg_kmh: number
  wind_gust_max_kmh: number
  precipitation_level: PrecipitationLevel
  precipitation_types: string[] | null
  weather_alerts: string[] | null
  atmosphere: Atmosphere | null
}

export interface Planet extends WaypointBase {
  category: "Planet"
  details: PlanetDetails | null
}
