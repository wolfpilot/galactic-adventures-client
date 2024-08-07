import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Utils
import { useBoundStore } from "@utils/stores/store"

// Styles
import styles from "./SiteHeader.module.css"

// Components
import Container from "@components/layout/Container/Container"
import Icon from "@components/icons/Icon"
import { SiteNav } from "@components/layout/Site"

// Setup
const LOGO_SIZE = 24

const SiteHeader = () => {
  const location = useLocation()

  const isNavOpen = useBoundStore((state) => state.isNavOpen)
  const closeNav = useBoundStore((state) => state.closeNav)
  const toggleNav = useBoundStore((state) => state.toggleNav)

  const isHomepage = location.pathname === "/"

  const handleOnMenuClick = () => {
    toggleNav()
  }

  useEffect(() => {
    closeNav()
  }, [location.pathname, closeNav])

  return (
    <header className={styles.wrapper}>
      <div className={styles.navbar}>
        <Container>
          <div className={styles.content}>
            <a
              className={`
                ${styles.logoLink}
                ${isHomepage ? styles.logoLink__isActive : ""}
                `}
              href="/"
            >
              <span>GA</span>
            </a>

            <button
              className={`
                ${styles.menuBtn}
                ${isNavOpen ? styles.menuBtn__isActive : ""}
                `}
              onClick={handleOnMenuClick}
            >
              <span>
                <Icon type="Menu" width={LOGO_SIZE} height={LOGO_SIZE} />
              </span>
            </button>
          </div>
        </Container>
      </div>
      <SiteNav />
    </header>
  )
}

export default SiteHeader
