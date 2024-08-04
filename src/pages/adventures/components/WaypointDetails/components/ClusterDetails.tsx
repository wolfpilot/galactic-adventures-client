// Types
import { ClusterDetails as Props } from "@ts/waypoints/categories/cluster.types"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const ClusterDetails = ({ constellations }: Props) => (
  <TabList>
    <TabItem label="Overview">
      {constellations?.length && (
        <p>Constellations: {constellations.join(", ")}</p>
      )}
    </TabItem>
  </TabList>
)

export default ClusterDetails
