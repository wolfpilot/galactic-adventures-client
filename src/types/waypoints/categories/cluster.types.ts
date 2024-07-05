// Types
import type { WaypointBase } from "../waypoint.types.js"

export interface ClusterDetails {
  constellations: string[] | null
}

export interface Cluster extends WaypointBase {
  category: "Cluster"
  details: ClusterDetails | null
}
