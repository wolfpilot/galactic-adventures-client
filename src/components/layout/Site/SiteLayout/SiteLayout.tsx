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
  const isLoading = useAppBoundStore((state) => state.isLoading)

  return (
    <div
      className={`
        ${styles.wrapper}
        ${isLoading ? "" : styles.wrapper__isLoaded}
      `}
    >
      <SiteBannerCookies />
      <SiteBannerNews />
      <SiteHeader />
      <SiteNav />

      <PageWrapper>{children}</PageWrapper>

      <SiteFooter />
    </div>
  )
}

export default SiteLayout
