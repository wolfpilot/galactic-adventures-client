// Types
import { Props } from "./types"

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

const SiteLayout = ({ children }: Props) => (
  <div className={styles.wrapper}>
    <SiteBannerCookies />
    <SiteBannerNews />
    <SiteHeader />
    <SiteNav />

    <PageWrapper>{children}</PageWrapper>

    <SiteFooter />
  </div>
)

export default SiteLayout
