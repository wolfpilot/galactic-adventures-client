// Types
import { Props } from "./types"

// Styles
import styles from "./ContentBlock.module.css"

const ContentBlock = ({ children, kind = "primary" }: Props) => (
  <div
    className={
      kind === "primary" ? styles.wrapperPrimary : styles.wrapperSecondary
    }
  >
    {children}
  </div>
)

export default ContentBlock
