// Assets
import LinkImgSrc from "/media/images/planet-orbit.gif"

// Constants
import { navRoutes } from "@constants/routes.constants"

// Utils
import { useBoundStore } from "@utils/stores/store"

// Styles
import styles from "./SiteNav.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { CustomLink } from "@components/links"

const SiteNav = () => {
  const isNavOpen = useBoundStore((state) => state.isNavOpen)

  return (
    <nav
      className={`
        ${styles.wrapper}
        ${isNavOpen ? styles.wrapper__isOpen : ""}
      `}
    >
      <Container>
        <ul className={styles.list}>
          {navRoutes.map((route, index) => (
            <li key={index} className={styles.listItem}>
              <CustomLink
                className={styles.link}
                href={route.url}
                aria-disabled={route.disabled}
              >
                <img
                  className={styles.linkImg}
                  src={LinkImgSrc}
                  width={50}
                  height={50}
                />
                <span>{route.label}</span>
                <img
                  className={styles.linkImg}
                  src={LinkImgSrc}
                  width={50}
                  height={50}
                />
              </CustomLink>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

export default SiteNav
