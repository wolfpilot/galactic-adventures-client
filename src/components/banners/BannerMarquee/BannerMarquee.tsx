// Types
import type { Props } from "./types"

// Utils
import { useAppBoundStore } from "@utils/stores"

// Styles
import styles from "./BannerMarquee.module.css"

const BannerMarquee = ({ children, className = "" }: Props) => {
  const isNavOpen = useAppBoundStore((state) => state.isNavOpen)

  return (
    <aside
      className={`
        ${styles.wrapper}
        ${className}
      `}
    >
      <span
        className={`
          ${styles.content}
          ${isNavOpen ? styles.content__isPaused : ""}
        `}
      >
        {children}
      </span>
    </aside>
  )
}

export default BannerMarquee
