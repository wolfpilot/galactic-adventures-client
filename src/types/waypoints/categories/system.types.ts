// Types
import type { WaypointBase } from "../waypoint.types.js"

export type SystemType = "Planetary" | "Star"

export interface SystemDetails {
  is_enabled: boolean
  is_inhabited: boolean
  type: SystemType
}

export interface System extends WaypointBase {
  category: "System"
  details: SystemDetails | null
}
