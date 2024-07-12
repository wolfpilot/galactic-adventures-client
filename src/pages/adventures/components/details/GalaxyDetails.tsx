// Types
import { GalaxyDetails as Props } from "@ts/waypoints/categories/galaxy.types"

const GalaxyDetails = ({ shape, emissions }: Props) => (
  <>
    {shape && <p>Shape: {shape}</p>}
    {emissions && <p>Emissions: {emissions}</p>}
  </>
)

export default GalaxyDetails
