import { useState } from "react"

// Data
import { bannerData as data } from "./data/banner.data"

// Styles
import styles from "./SiteBannerCookies.module.css"

// Components
import Container from "@components/layout/Container/Container"
import Icon from "@components/icons/Icon"

const SiteBannerCookies = () => {
  const [isClosed, setIsClosed] = useState(false)

  const handleOnClickClose = () => {
    setIsClosed(true)
  }

  return (
    <>
      {data.text && (
        <aside
          className={`
          ${styles.wrapper}
          ${isClosed ? styles.wrapper__isClosed : ""}
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
