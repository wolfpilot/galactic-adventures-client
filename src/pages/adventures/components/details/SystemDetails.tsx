// Types
import { SystemDetails as Props } from "@ts/waypoints/categories/system.types"

const SystemDetails = ({ is_inhabited, type }: Props) => (
  <>
    <p>Inhabited: {is_inhabited ? "Yes" : "No"}</p>
    {type && <p>Type: {type}</p>}
  </>
)

export default SystemDetails
