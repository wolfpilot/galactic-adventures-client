import { useLocation } from "react-router-dom"

// Utils
import { useAppBoundStore } from "@utils/stores"

// Components
import { BannerMarquee } from "@components/banners"

const SiteBannerNews = () => {
  const bannerNewsData = useAppBoundStore((state) => state.bannerNewsData)

  const location = useLocation()

  const isHomepage = location.pathname === "/"

  return (
    <>
      {isHomepage && bannerNewsData && (
        <BannerMarquee>{bannerNewsData.text}</BannerMarquee>
      )}
    </>
  )
}

export default SiteBannerNews
