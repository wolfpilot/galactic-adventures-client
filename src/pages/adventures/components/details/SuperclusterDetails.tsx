// Types
import { SuperclusterDetails as Props } from "@ts/waypoints/categories/supercluster.types"

const SuperclusterDetails = ({ morphology }: Props) => (
  <>{morphology && <p>Morphology: ${morphology}</p>}</>
)

export default SuperclusterDetails
