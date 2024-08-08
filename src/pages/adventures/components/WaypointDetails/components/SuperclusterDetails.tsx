// Types
import { SuperclusterDetails as Props } from "@ts/waypoints/categories/supercluster.types"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const SuperclusterDetails = ({ morphology }: Props) => (
  <TabList>
    <TabItem label="Overview">
      {morphology && <p>Morphology: {morphology}</p>}
    </TabItem>
  </TabList>
)

export default SuperclusterDetails
