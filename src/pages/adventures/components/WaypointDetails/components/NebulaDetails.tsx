// Types
import { NebulaDetails as Props } from "@ts/waypoints/categories/nebula.types"

// Utils
import { isNullish } from "@utils/helpers/comparison.helpers"
import { useFormatTemperatureUnit } from "@utils/hooks/data"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const NebulaDetails = ({ type, composition, age_y, temp_avg_k }: Props) => {
  // Parse data
  const formattedData = {
    tempAvg: useFormatTemperatureUnit(temp_avg_k),
  }

  return (
    <TabList>
      <TabItem label="Overview">
        {type && <p>Type: {type}</p>}
        {composition && <p>Composition: {composition}</p>}
        {!isNullish(age_y) && <p>Age: {age_y} years</p>}
        {formattedData.tempAvg && (
          <p>Average Temperature: {formattedData.tempAvg}</p>
        )}
      </TabItem>
    </TabList>
  )
}

export default NebulaDetails
