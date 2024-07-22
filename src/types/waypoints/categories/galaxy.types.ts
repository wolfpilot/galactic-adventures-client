// Types
import type { WaypointBase } from "../waypoint.types.js"

export type GalaxyEmissions = "Quiescent" | "Active"
export type GalaxyShape =
  | "Spiral"
  | "Elliptical"
  | "Lenticular"
  | "Peculiar"
  | "Irregular"

export interface GalaxyDetails {
  shape: GalaxyShape
  emissions: GalaxyEmissions
}

export interface Galaxy extends WaypointBase {
  category: "Galaxy"
  details: GalaxyDetails | null
}
