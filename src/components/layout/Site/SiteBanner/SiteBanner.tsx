// Data
import { siteBannerData } from "./data/siteBanner.data"

// Utils
import { getRandomItem } from "@utils/helpers/array.helpers"

// Styles
import styles from "./SiteBanner.module.css"

// Components
import { Marquee } from "@components/banners"

// Setup
const latestNews = getRandomItem(siteBannerData)

const SiteBanner = () => (
  <aside className={styles.wrapper}>
    {latestNews && <Marquee>{latestNews}</Marquee>}
  </aside>
)

export default SiteBanner
