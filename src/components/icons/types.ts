export enum Icons {
  // Interaction
  ChevronLeft = "ChevronLeft",
  ChevronRight = "ChevronRight",
  Close = "Close",
  Grab = "Grab",
  Menu = "Menu",
  // Objects
  SpaceFlight = "SpaceFlight",
}

export interface Props extends React.SVGAttributes<SVGElement> {
  className?: string | undefined
  width?: number
  height?: number
}
