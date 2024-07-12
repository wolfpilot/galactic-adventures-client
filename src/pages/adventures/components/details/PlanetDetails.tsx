// Types
import { PlanetDetails as Props } from "@ts/waypoints/categories/planet.types"

const PlanetDetails = ({ is_habitable, size, composition }: Props) => (
  <>
    {is_habitable && <p>Habitable: {is_habitable ? "Yes" : "No"}</p>}
    {size && <p>Size: {size}</p>}
    {composition && <p>Composition: {composition}</p>}
  </>
)

export default PlanetDetails
