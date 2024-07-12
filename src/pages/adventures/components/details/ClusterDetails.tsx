// Types
import { ClusterDetails as Props } from "@ts/waypoints/categories/cluster.types"

const ClusterDetails = ({ constellations }: Props) => (
  <>
    {constellations?.length && (
      <p>Constellations: {constellations.join(", ")}</p>
    )}
  </>
)

export default ClusterDetails
