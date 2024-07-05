// Types
import type { WaypointBase } from "../waypoint.types.js"

export type SuperclusterMorphology = "Spider" | "Filament" | "Field"

export interface SuperclusterDetails {
  morphology: SuperclusterMorphology
}

export interface Supercluster extends WaypointBase {
  category: "Supercluster"
  details: SuperclusterDetails | null
}
