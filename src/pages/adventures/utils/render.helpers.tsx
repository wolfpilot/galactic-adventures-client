// Types
import { Waypoint } from "@ts/waypoints/waypoint.types"

// Utils
import { assertExhaustiveGuard } from "@utils/helpers/typeGuard.helpers"

// Components
import {
  SuperclusterDetails,
  ClusterDetails,
  GalaxyDetails,
  NebulaDetails,
  SystemDetails,
  StarDetails,
  PlanetDetails,
  SatelliteDetails,
} from "../components/details/"

export const renderDetailsByCategory = (waypoint: Waypoint) => {
  if (!waypoint.details) return null

  const cat = waypoint.category

  switch (cat) {
    case "Supercluster":
      return <SuperclusterDetails {...waypoint.details} />
    case "Cluster":
      return <ClusterDetails {...waypoint.details} />
    case "Galaxy":
      return <GalaxyDetails {...waypoint.details} />
    case "Nebula":
      return <NebulaDetails {...waypoint.details} />
    case "System":
      return <SystemDetails {...waypoint.details} />
    case "Star":
      return <StarDetails {...waypoint.details} />
    case "Planet":
      return <PlanetDetails {...waypoint.details} />
    case "Satellite":
      return <SatelliteDetails {...waypoint.details} />
    default:
      return assertExhaustiveGuard(cat)
  }
}
