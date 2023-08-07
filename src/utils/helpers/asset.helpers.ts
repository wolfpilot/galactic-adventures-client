import { Cloudinary } from "@cloudinary/url-gen"

// Types
import { WaypointCategory } from "@ts/waypoints/waypoint.types"

// Setup
const { VITE_CLOUDINARY_PROJECT_ID = "" } = import.meta.env

export const cld = new Cloudinary({
  cloud: {
    cloudName: VITE_CLOUDINARY_PROJECT_ID,
  },
  url: {
    secure: true,
  },
})

export const categoryToFolderName: Record<WaypointCategory, string> = {
  Supercluster: "Superclusters",
  Cluster: "Clusters",
  Galaxy: "Galaxies",
  Nebula: "Nebulae",
  System: "Systems",
  Star: "Stars",
  Planet: "Planets",
  Satellite: "Satellites",
}
