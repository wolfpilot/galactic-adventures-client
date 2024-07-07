// Types
import { WaypointCategory } from "@ts/waypoints/waypoint.types"

// Setup
const { VITE_ASSETS_URL = "" } = import.meta.env

const categoryToFolderName: Record<WaypointCategory, string> = {
  Supercluster: "Superclusters",
  Cluster: "Clusters",
  Galaxy: "Galaxies",
  Nebula: "Nebulae",
  System: "Systems",
  Star: "Stars",
  Planet: "Planets",
  Satellite: "Satellites",
}

export const getImagePath = (category: WaypointCategory) =>
  `${VITE_ASSETS_URL}/${categoryToFolderName[category]}`
