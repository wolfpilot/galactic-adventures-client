// Types
import { GalaxyDetails as Props } from "@ts/waypoints/categories/galaxy.types"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const GalaxyDetails = ({ shape, emissions }: Props) => (
  <TabList>
    <TabItem label="Overview">
      {shape && <p>Shape: {shape}</p>}
      {emissions && <p>Emissions: {emissions}</p>}
    </TabItem>
  </TabList>
)

export default GalaxyDetails
