// Types
import { NebulaDetails as Props } from "@ts/waypoints/categories/nebula.types"

// Utils
import { isNullish } from "@utils/helpers/comparison.helpers"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const NebulaDetails = ({ type, composition, age_y, temp_avg_k }: Props) => (
  <TabList>
    <TabItem label="Overview">
      {type && <p>Type: {type}</p>}
      {composition && <p>Composition: {composition}</p>}
      {!isNullish(age_y) && <p>Age: {age_y} years</p>}
      {temp_avg_k && <p>Average Temperature: {temp_avg_k}K</p>}
    </TabItem>
  </TabList>
)

export default NebulaDetails
