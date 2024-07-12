// Types
import { NebulaDetails as Props } from "@ts/waypoints/categories/nebula.types"

const NebulaDetails = ({ type, composition, age_y, temp_avg_k }: Props) => (
  <>
    {type && <p>Type: {type}</p>}
    {composition && <p>Composition: {composition}</p>}
    {age_y && <p>Age: {age_y} years</p>}
    {temp_avg_k && <p>Average Temperature: {temp_avg_k}K</p>}
  </>
)

export default NebulaDetails
