// Types
import { Props } from "./types"

// Styles
import styles from "./SubmitButton.module.css"

const SubmitButton = ({ children, label, ...rest }: Props) => (
  <button className={styles.wrapper} type="submit" {...rest}>
    {children || label}
  </button>
)

export default SubmitButton
