// Types
import { Icons, Props } from "./types"

// SVGs
import ChevronLeft from "./ChevronLeft"
import ChevronRight from "./ChevronRight"
import Grab from "./Grab"

const Icon = ({ type, ...props }: Props) => {
  switch (type) {
    // Interaction
    case Icons.ChevronLeft:
      return <ChevronLeft {...props} />
    case Icons.ChevronRight:
      return <ChevronRight {...props} />
    case Icons.Grab:
      return <Grab {...props} />

    default:
      throw new Error(`Icon type ${type} not found.`)
  }
}

export default Icon
