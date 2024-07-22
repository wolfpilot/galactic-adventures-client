// Types
import type { WaypointBase } from "../waypoint.types.js"

export type NebulaComposition = "Hydrogen-rich" | "Molecular" | "Dust-rich"
export type NebulaType =
  | "Emission"
  | "Reflection"
  | "Dark"
  | "Planetary"
  | "Supernova Remnant"

export interface NebulaDetails {
  type: NebulaType
  composition: NebulaComposition
  age_y: number
  temp_avg_k: number
}

export interface Nebula extends WaypointBase {
  category: "Nebula"
  details: NebulaDetails | null
}
