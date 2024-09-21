import { useState, useEffect } from "react"

// Data
import { data } from "./data/overlayLoader.data"

// Constants
import { routes } from "@constants/routes.constants"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { pingServer } from "@utils/helpers/api.helpers"
import { disableScroll } from "@utils/helpers/dom.helpers"

// Styles
import styles from "./OverlayLoader.module.css"

// Components
import Container from "@components/layout/Container/Container"

// Setup
const ENTRY_DELAY_MS = 500

const dynamicRoutes = [
  routes.adventures.url,
  routes.payment.url,
  routes.order.url,
]
const pathname = window.location.pathname.split("/")[1]
const skipPing = dynamicRoutes.includes(`/${pathname}`)

const OverlayLoader = () => {
  const isLoading = useAppBoundStore((state) => state.isLoading)
  const updateIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const [isHidden, setIsHidden] = useState(true)

  // Hooks
  useEffect(() => {
    /**
     * Ping the server only once on mount.
     *
     * Normally this wouldn't be necessary, however using free dynos means that
     * the servers enter hybernation after 15 minutes of inactivity.
     *
     * We solve this partially by showing a loader on all pages.
     *
     * For dynamic pages, the isLoading state can be updated once data is loaded.
     * For static pages, we can send a request to any other endpoint.
     *
     * Doing this greatly improves the UX so that a user starting from the Homepage
     * doesn't suddenly have to wait upwards of 1 minute for the Adventures page
     * to load. It's nicer to "delay" the whole experience just a bit instead.
     */
    const waitPing = async () => {
      if (skipPing) return

      updateIsLoading(true)

      const res = await pingServer()

      if (!res.ok) return

      updateIsLoading(false)
    }

    waitPing()
  }, [updateIsLoading])

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
