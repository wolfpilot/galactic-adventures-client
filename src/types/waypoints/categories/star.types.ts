// Types
import type { WaypointBase } from "../waypoint.types.js"
import type { Atmosphere } from "../common.types.js"

export type StarLifeCycle =
  | "Protostar"
  | "Main Sequence"
  | "Red Giant"
  | "Red Supergiant"
  | "Planetary Nebula"
  | "White Dwarf"
  | "Black Dwarf"
  | "Supernova"
  | "Black Hole"
  | "Neutron Star"
  | "Pulsar"
export type StarMass = "Low" | "High" | "Intermediate"
export type StarSpectralClass = "O" | "B" | "A" | "F" | "G" | "K" | "M"

export interface SpectralClass {
  class: StarSpectralClass
  chromacity: string
  temperature_min_k: number
  temperature_max_k: number
}

export interface StarDetails {
  life_cycle: StarLifeCycle
  mass: StarMass
  spectral_class: SpectralClass
  atmosphere: Atmosphere
}

export interface Star extends WaypointBase {
  category: "Star"
  details: StarDetails | null
}
