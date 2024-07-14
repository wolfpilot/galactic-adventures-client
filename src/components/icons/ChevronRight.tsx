import { Props } from "./types"

const ChevronRight = ({
  className,
  width = 24,
  height = 24,
  fill = "#ffffff",
  stroke = "#ffffff",
}: Props) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5v2h2V5H8zm4 4V7h-2v2h2zm2 2V9h-2v2h2zm0 2h2v-2h-2v2zm-2 2v-2h2v2h-2zm0 0h-2v2h2v-2zm-4 4v-2h2v2H8z" />
  </svg>
)

export default ChevronRight
