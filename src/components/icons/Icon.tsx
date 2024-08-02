// Types
import { Icons, Props as IconProps } from "./types"

// Utils
import { assertExhaustiveGuard } from "@utils/helpers/typeGuard.helpers"

// SVGs
import ChevronLeft from "./ChevronLeft"
import ChevronRight from "./ChevronRight"
import Grab from "./Grab"
import Menu from "./Menu"

import SpaceFlight from "./SpaceFlight"

export interface Props extends IconProps {
  type: keyof typeof Icons
}

const Icon = ({ type, ...props }: Props) => {
  switch (type) {
    // Interaction
    case "ChevronLeft":
      return <ChevronLeft {...props} />
    case "ChevronRight":
      return <ChevronRight {...props} />
    case "Grab":
      return <Grab {...props} />
    case "Menu":
      return <Menu {...props} />
    // Objects
    case "SpaceFlight":
      return <SpaceFlight {...props} />
    default:
      return assertExhaustiveGuard(type)
  }
}

export default Icon
