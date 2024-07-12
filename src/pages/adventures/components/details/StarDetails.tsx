// Types
import { StarDetails as Props } from "@ts/waypoints/categories/star.types"

const StarDetails = ({ life_cycle, mass }: Props) => (
  <>
    {life_cycle && <p>Life Cycle Stage: {life_cycle}</p>}
    {mass && <p>Mass: {mass}</p>}
  </>
)

export default StarDetails
