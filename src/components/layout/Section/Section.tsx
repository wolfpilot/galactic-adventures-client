// Types
import { Props } from "./types"

// Styles
import styles from "./Section.module.css"

const Section = ({ children, className = "" }: Props) => (
  <section
    className={`
    ${styles.wrapper}
    ${className}
  `}
  >
    {children}
  </section>
)

export default Section
