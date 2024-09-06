// Types
import { Props } from "./types"

// Styles
import styles from "./SiteBannerNews.module.css"

// Components
import { Marquee } from "@components/banners"

const SiteBannerNews = ({ text }: Props) => (
  <>
    {text && (
      <aside className={styles.wrapper}>
        <Marquee>{text}</Marquee>
      </aside>
    )}
  </>
)

export default SiteBannerNews
