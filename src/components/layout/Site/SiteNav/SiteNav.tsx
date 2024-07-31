// Constants
import { routes } from "@constants/routes.constants"

// Utils
import { useBoundStore } from "@utils/stores/store"

// Styles
import styles from "./SiteNav.module.css"

// Components
import Container from "@components/layout/Container/Container"

const navRoutes = [routes.adventures, routes.tours, routes.merch]

const SiteNav = () => {
  const isNavOpen = useBoundStore((state) => state.isNavOpen)

  return (
    <nav
      className={`
        ${styles.wrapper}
        ${isNavOpen && styles.wrapper__isOpen}
      `}
    >
      <Container>
        <ul className={styles.list}>
          {navRoutes.map((route, index) => (
            <li key={index} className={styles.listItem}>
              <a className={styles.link} href={route.url}>
                {route.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

export default SiteNav
