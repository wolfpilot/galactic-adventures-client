// Types
import type { Props } from "./types"

// Utils
import { useBoundStore } from "@utils/stores/store"

// Styles
import styles from "./Marquee.module.css"

const Marquee = ({ children, className = "" }: Props) => {
  const isNavOpen = useBoundStore((state) => state.isNavOpen)

  return (
    <div
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
    </div>
  )
}

export default Marquee
