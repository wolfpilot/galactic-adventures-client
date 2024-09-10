// Types
import type { WaypointCategory } from "@ts/waypoints/waypoint.types"

export const waypointCategoryToFolderName: Record<WaypointCategory, string> = {
  Supercluster: "Superclusters",
  Cluster: "Clusters",
  Galaxy: "Galaxies",
  Nebula: "Nebulae",
  System: "Systems",
  Star: "Stars",
  Planet: "Planets",
  Satellite: "Satellites",
}
