// Types
import { Props } from "./types"

// Styles
import styles from "./ContentRow.module.css"

const ContentRow = ({ children, className = "", isPadded = true }: Props) => (
  <div
    className={`
      ${styles.wrapper}
      ${isPadded ? styles.wrapper__isPadded : ""}
      ${className}
    `}
  >
    {children}
  </div>
)

export default ContentRow
