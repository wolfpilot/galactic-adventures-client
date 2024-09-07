// Types
import { Props } from "./types"

// Components
import { BannerMarquee } from "@components/banners"

const SiteBannerNews = ({ text }: Props) => (
  <>{text && <BannerMarquee>{text}</BannerMarquee>}</>
)

export default SiteBannerNews
