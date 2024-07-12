// Types
import { type Props } from "./types"

// Styles
import styles from "./PageHeader.module.css"

const PageHeader = ({ title, description }: Props) => (
  <header className={styles.wrapper}>
    {title && <h1>{title}</h1>}
    {description && <p>{description}</p>}
  </header>
)

export default PageHeader
