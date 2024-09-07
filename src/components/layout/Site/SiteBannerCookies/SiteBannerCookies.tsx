// Data
import { bannerData as data } from "./data/banner.data"

// Utils
import { usePersistBoundStore } from "@utils/stores"

// Components
import { BannerInfo } from "@components/banners"

const SiteBannerCookies = () => {
  const cookies = usePersistBoundStore((state) => state.cookies)

  const updateShowCookiesBanner = usePersistBoundStore(
    (state) => state.updateShowCookiesBanner
  )

  const handleOnClickClose = () => {
    updateShowCookiesBanner(false)
  }

  return (
    <BannerInfo
      {...data}
      isClosed={!cookies.showBanner}
      onCloseHandler={handleOnClickClose}
    />
  )
}

export default SiteBannerCookies
