// Types
import type { Props } from "./types"

// Styles
import styles from "./Marquee.module.css"

const Marquee = ({ children, className = "" }: Props) => (
  <div
    className={`
        ${styles.wrapper}
        ${className}
      `}
  >
    <span className={styles.content}>{children}</span>
  </div>
)

export default Marquee
