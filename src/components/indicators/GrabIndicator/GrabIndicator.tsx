// Types
import { Props } from "./types"

// Styles
import styles from "./GrabIndicator.module.css"

// Components
import Icon from "@components/icons/Icon"

// Setup
const DEFAULT_ICON_SIZE = 32

const GrabIndicator = ({ className }: Props) => (
  <div className={`${className} ${styles.wrapper}`}>
    <Icon
      className={styles.iconLeft}
      type="chevronLeft"
      width={DEFAULT_ICON_SIZE}
      height={DEFAULT_ICON_SIZE}
      stroke="none"
    />
    <Icon
      className={styles.iconGrab}
      type="grab"
      width={DEFAULT_ICON_SIZE}
      height={DEFAULT_ICON_SIZE}
      stroke="none"
    />
    <Icon
      className={styles.iconRight}
      type="chevronRight"
      width={DEFAULT_ICON_SIZE}
      height={DEFAULT_ICON_SIZE}
      stroke="none"
    />
  </div>
)

export default GrabIndicator
