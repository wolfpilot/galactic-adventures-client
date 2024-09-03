import { useEffect } from "react"
import { useLocation, Link } from "react-router-dom"

// Utils
import { useBoundStore } from "@utils/stores/store"

// Styles
import styles from "./SiteHeader.module.css"

// Components
import Container from "@components/layout/Container/Container"
import Icon from "@components/icons/Icon"

// Setup
const LOGO_SIZE = 24

const SiteHeader = () => {
  const location = useLocation()

  const isNavOpen = useBoundStore((state) => state.isNavOpen)
  const closeNav = useBoundStore((state) => state.closeNav)
  const toggleNav = useBoundStore((state) => state.toggleNav)

  const currentUrl = location.pathname + location.search
  const isHomepage = location.pathname === "/"

  const handleOnMenuClick = () => {
    toggleNav()
  }

  useEffect(() => {
    closeNav()
  }, [currentUrl, closeNav])

  return (
    <header className={styles.wrapper}>
      <div
        className={`
          ${styles.navbar}
          ${isNavOpen ? styles.navbar__isActive : ""}
        `}
      >
        <Container>
          <div className={styles.content}>
            <Link
              className={`
                ${styles.logoLink}
                ${isHomepage ? styles.logoLink__isActive : ""}
                `}
              to="/"
            >
              <span>GA</span>
            </Link>

            <button
              className={`
                ${styles.menuBtn}
                ${isNavOpen ? styles.menuBtn__isActive : ""}
                `}
              aria-label="Menu"
              onClick={handleOnMenuClick}
            >
              <span>
                <Icon type="Menu" width={LOGO_SIZE} height={LOGO_SIZE} />
              </span>
            </button>
          </div>
        </Container>
      </div>
    </header>
  )
}

export default SiteHeader
