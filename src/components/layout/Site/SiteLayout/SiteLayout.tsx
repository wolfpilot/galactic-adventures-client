import { useLocation } from "react-router-dom"

// Types
import { Props } from "./types"

// Utils
import { useAppBoundStore } from "@utils/stores"

// Styles
import styles from "./SiteLayout.module.css"

// Components
import {
  SiteHeader,
  SiteNav,
  SiteFooter,
  SiteBannerCookies,
  SiteBannerNews,
} from "@components/layout/Site"
import { PageWrapper } from "@components/layout/Page"

const SiteLayout = ({ children }: Props) => {
  const location = useLocation()

  const isHomepage = location.pathname === "/"

  const siteBannerNewsData = useAppBoundStore((state) => state.bannerNewsData)

  return (
    <div className={styles.wrapper}>
      <SiteBannerCookies />
      {isHomepage && siteBannerNewsData && (
        <SiteBannerNews {...siteBannerNewsData} />
      )}
      <SiteHeader />
      <SiteNav />

      <PageWrapper>{children}</PageWrapper>

      <SiteFooter />
    </div>
  )
}

export default SiteLayout
