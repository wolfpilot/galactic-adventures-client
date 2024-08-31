// Types
import { Props } from "./types"

// Styles
import styles from "./SwitchField.module.css"

const SwitchField = ({ className = "", name, options, ...rest }: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.option}>{options[0]}</div>

    <label className={styles.label}>
      <input
        className={`
          ${styles.input}
          ${className}
        `}
        name={name}
        type="checkbox"
        {...rest}
      />
      <span className={styles.track}></span>
    </label>

    <div className={styles.option}>{options[1]}</div>
  </div>
)

export default SwitchField
