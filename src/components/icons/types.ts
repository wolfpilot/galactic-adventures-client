export enum Icons {
  // Interaction
  ChevronLeft = "chevronLeft",
  ChevronRight = "chevronRight",
  Grab = "grab",
}

export interface Props extends React.SVGAttributes<SVGElement> {
  className?: string | undefined
  width?: number
  height?: number
}
