// Types
import type { AdventureBase } from "@ts/products/adventures.types.js"

import type {
  Supercluster,
  SuperclusterDetails,
} from "./categories/supercluster.types.js"
import type { Cluster, ClusterDetails } from "./categories/cluster.types.js"
import type { Galaxy, GalaxyDetails } from "./categories/galaxy.types.js"
import type { Nebula, NebulaDetails } from "./categories/nebula.types.js"
import type { System, SystemDetails } from "./categories/system.types.js"
import type { Star, StarDetails } from "./categories/star.types.js"
import type { Planet, PlanetDetails } from "./categories/planet.types.js"
import type {
  Satellite,
  SatelliteDetails,
} from "./categories/satellite.types.js"

export type WaypointCategory =
  | "Star"
  | "Supercluster"
  | "Cluster"
  | "Galaxy"
  | "Nebula"
  | "System"
  | "Planet"
  | "Satellite"

export interface WaypointBase {
  id: number
  parent_id: number
  code: string
  name: string
  category: WaypointCategory
  img_id: string
  thumb_img_id: string
}

export type WaypointDetails =
  | SuperclusterDetails
  | ClusterDetails
  | GalaxyDetails
  | NebulaDetails
  | SystemDetails
  | StarDetails
  | PlanetDetails
  | SatelliteDetails

export type WaypointPartial =
  | Supercluster
  | Cluster
  | Galaxy
  | Nebula
  | System
  | Star
  | Planet
  | Satellite

export type WaypointAdventurePartial = Pick<AdventureBase, "id" | "price_sb">
export type WaypointChildPartial = WaypointBase & {
  adventure: WaypointAdventurePartial | null
}

export type Waypoint = WaypointPartial & {
  adventure: WaypointAdventurePartial | null
  children: WaypointChildPartial[]
}
