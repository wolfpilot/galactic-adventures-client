// Data
import { bannerData as data } from "./data/banner.data"

// Utils
import { usePersistBoundStore } from "@utils/stores"

// Styles
import styles from "./SiteBannerCookies.module.css"

// Components
import Container from "@components/layout/Container/Container"
import Icon from "@components/icons/Icon"

const SiteBannerCookies = () => {
  const cookies = usePersistBoundStore((state) => state.cookies)

  const updateShowCookiesBanner = usePersistBoundStore(
    (state) => state.updateShowCookiesBanner
  )

  const handleOnClickClose = () => {
    updateShowCookiesBanner(false)
  }

  return (
    <>
      {data.text && (
        <aside
          className={`
          ${styles.wrapper}
          ${cookies.showBanner ? "" : styles.wrapper__isClosed}
        `}
        >
          <Container>
            <header className={styles.header}>
              <h4 className={styles.title}>Notice</h4>

              <button className={styles.closeBtn} onClick={handleOnClickClose}>
                <Icon
                  className={styles.closeBtnIcon}
                  type="Close"
                  width={24}
                  height={24}
                />
              </button>
            </header>

            <div className={styles.content}>{data.text}</div>
          </Container>
        </aside>
      )}
    </>
  )
}

export default SiteBannerCookies
