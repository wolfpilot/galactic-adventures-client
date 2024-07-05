// Types
import { SatelliteDetails as Props } from "@ts/waypoints/categories/satellite.types"

const SatelliteDetails = ({ size, composition }: Props) => (
  <>
    {size && <p>Size: {size}</p>}
    {composition && <p>Composition: {composition}</p>}
  </>
)

export default SatelliteDetails
