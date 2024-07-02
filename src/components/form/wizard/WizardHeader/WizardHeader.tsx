// Types
import { type Props } from "./types"

// Styles
import styles from "./WizardHeader.module.css"

const WizardHeader = ({ title, description }: Props) => (
  <header className={styles.wrapper}>
    {title && <h1>{title}</h1>}
    {description && <p>{description}</p>}
  </header>
)

export default WizardHeader
