// Types
import { Props } from "./types"

// Styles
import styles from "./SiteBanner.module.css"

// Components
import { Marquee } from "@components/banners"

const SiteBanner = ({ text }: Props) => (
  <>
    {text && (
      <aside className={styles.wrapper}>
        <Marquee>{text}</Marquee>
      </aside>
    )}
  </>
)

export default SiteBanner
