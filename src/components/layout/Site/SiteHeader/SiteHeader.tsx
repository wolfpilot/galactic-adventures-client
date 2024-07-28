// Styles
import styles from "./SiteHeader.module.css"

// Components
import Container from "@components/layout/Container/Container"
import Icon from "@components/icons/Icon"

// Setup
const LOGO_SIZE = 24

const SiteHeader = () => (
  <header className={styles.wrapper}>
    <Container>
      <div className={styles.content}>
        <a className={styles.logoLink} href="/">
          <span>GA</span>
        </a>

        <button className={styles.menuBtn}>
          <span>
            <Icon type="Menu" width={LOGO_SIZE} height={LOGO_SIZE} />
          </span>
        </button>
      </div>
    </Container>
  </header>
)

export default SiteHeader
