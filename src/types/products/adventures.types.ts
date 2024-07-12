// Types
import type { WaypointBase } from "@ts/waypoints/waypoint.types"

export interface AdventureBase {
  id: number
  description: string
  price_sb: number
}

export type Adventure = AdventureBase & {
  waypoint: WaypointBase | null
}
