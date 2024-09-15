// Types
import { Props } from "./types"

// Styles
import styles from "./PageContent.module.css"

const PageContent = ({ children }: Props) => (
  <div className={styles.wrapper}>{children}</div>
)

export default PageContent
