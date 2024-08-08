// Types
import { Props } from "./types"

// Styles
import styles from "./TabItem.module.css"

const Tabs = ({ className = "", children }: Props) => {
  if (!children) return null

  return (
    <div
      className={`
        ${styles.wrapper}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Tabs
