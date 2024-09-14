import { useState, useEffect } from "react"

// Utils
import { useAppBoundStore } from "@utils/stores"

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

      <div className={styles.notice}>
        <Container>
          <div className={styles.noticeText}>
            Note: this app uses free dynos, first load may take up to 45s.
            Please be patient.
          </div>
        </Container>
      </div>
    </div>
  )
}

export default OverlayLoader
