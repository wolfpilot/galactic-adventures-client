import { Props } from "./types"

const Menu = ({
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
    viewBox="0 0 500 500"
    fill={fill}
    stroke={stroke}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M231 66V55H269V66V71H274H285V109H274H269V114V125H231V114V109H226H215V71H226H231V66Z"
      strokeWidth="10"
    />
    <path
      d="M231 226V215H269V226V231H274H285V269H274H269V274V285H231V274V269H226H215V231H226H231V226Z"
      strokeWidth="10"
    />
    <path
      d="M231 386V375H269V386V391H274H285V429H274H269V434V445H231V434V429H226H215V391H226H231V386Z"
      strokeWidth="10"
    />
  </svg>
)

export default Menu
