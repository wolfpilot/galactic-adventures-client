// Types
import { Props } from "./types"

// Styles
import styles from "./Cta.module.css"

const Cta = (props: Props) => {
  if (props.as === "anchor") {
    const { children, className = "", ...rest } = props

    return (
      <a
        className={`
          ${styles.wrapper}
          ${className}
        `}
        {...rest}
      >
        <span className={styles.content}>{children}</span>
      </a>
    )
  } else {
    const { children, className = "", ...rest } = props

    return (
      <button
        className={`
          ${styles.wrapper}
          ${className}
        `}
        type="button"
        {...rest}
      >
        <span className={styles.content}>{children}</span>
      </button>
    )
  }
}

export default Cta
