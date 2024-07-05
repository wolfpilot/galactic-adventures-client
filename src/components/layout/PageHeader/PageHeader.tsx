// Types
import { type Props } from "./types"

// Styles
import styles from "./PageHeader.module.css"

// Components
import Container from "../Container/Container"

const PageHeader = ({ title, description }: Props) => (
  <header className={styles.wrapper}>
    <Container>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
    </Container>
  </header>
)

export default PageHeader
