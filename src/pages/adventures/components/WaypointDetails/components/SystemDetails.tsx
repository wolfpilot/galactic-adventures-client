// Types
import { SystemDetails as Props } from "@ts/waypoints/categories/system.types"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const SystemDetails = ({ is_inhabited, type }: Props) => (
  <TabList>
    <TabItem label="Overview">
      <p>Inhabited: {is_inhabited ? "Yes" : "No"}</p>
      {type && <p>Type: {type}</p>}
    </TabItem>
  </TabList>
)

export default SystemDetails
