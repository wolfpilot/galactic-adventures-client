// Types
import { Props } from "./types"

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
} from "./components"

const WaypointDetails = ({ waypoint }: Props) => {
  const { details, category } = waypoint

  if (!details) return null

  switch (category) {
    case "Supercluster":
      return <SuperclusterDetails {...details} />
    case "Cluster":
      return <ClusterDetails {...details} />
    case "Galaxy":
      return <GalaxyDetails {...details} />
    case "Nebula":
      return <NebulaDetails {...details} />
    case "System":
      return <SystemDetails {...details} />
    case "Star":
      return <StarDetails {...details} />
    case "Planet":
      return <PlanetDetails {...details} />
    case "Satellite":
      return <SatelliteDetails {...details} />
    default:
      return assertExhaustiveGuard(category)
  }
}

export default WaypointDetails
