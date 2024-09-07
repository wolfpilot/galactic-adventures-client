// Types
import type { Props as CtaProps } from "@components/ctas/Cta/types"

// Styles
import styles from "./PageCta.module.css"

// Components
import { Cta } from "@components/ctas"

const PageCta = (props: CtaProps) => (
  <div className={styles.wrapper}>
    <Cta {...props} />
  </div>
)

export default PageCta
