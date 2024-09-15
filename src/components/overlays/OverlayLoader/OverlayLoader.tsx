import { useState, useEffect } from "react"

// Data
import { data } from "./data/overlayLoader.data"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { disableScroll } from "@utils/helpers/dom.helpers"

// Styles
import styles from "./OverlayLoader.module.css"

// Components
import Container from "@components/layout/Container/Container"

// Setup
const ENTRY_DELAY_MS = 500

const OverlayLoader = () => {
  const isLoading = useAppBoundStore((state) => state.isLoading)

  const [isHidden, setIsHidden] = useState(isLoading)

  // Hooks
  useEffect(() => {
    /**
     * To not have the loading screen pop up every time unnecessarily and potentially
     * hiding other entry animations, we first check if the loading state has been active
     * for a sensible amount of time.
     *
     * It's just better UX.
     */
    if (!isLoading) {
      setIsHidden(true)

      return
    }

    const timeoutId = setTimeout(() => {
      setIsHidden(false)
    }, ENTRY_DELAY_MS)

    return () => clearTimeout(timeoutId)
  }, [isLoading])

  useEffect(() => {
    disableScroll(document.documentElement, isLoading)
  }, [isLoading])

  return (
    <div
      className={`
        ${styles.wrapper}
        ${isHidden ? styles.wrapper__isHidden : ""}
        `}
    >
      <h1 className={styles.title}>Loading</h1>
      <div className={styles.progress}>
        <span className={styles.progressItem} />
        <span className={styles.progressItem} />
        <span className={styles.progressItem} />
      </div>

      {data.text && (
        <div className={styles.notice}>
          <Container>
            <div className={styles.noticeText}>{data.text}</div>
          </Container>
        </div>
      )}
    </div>
  )
}

export default OverlayLoader
