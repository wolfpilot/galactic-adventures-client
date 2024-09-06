import { useLocation } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Types
import { Props } from "./types"

// Constants
import { metadata } from "@constants/metadata.constants"

// Utils
import { useAppBoundStore } from "@utils/stores"
// Components
import Head from "@components/layout/Head/Head.tsx"
import {
  SiteHeader,
  SiteNav,
  SiteFooter,
  SiteBanner,
} from "@components/layout/Site"
import { PageWrapper } from "@components/layout/Page"
import DebugGrid from "@components/utils/DebugGrid/DebugGrid"

// Styles
import "@styles/index.css"

const Root = ({ children }: Props) => {
  const location = useLocation()

  const isHomepage = location.pathname === "/"
  const params = new URLSearchParams(location.search)

  const debugReactQueryParam = params.get("debugReactQuery")
  const enableDebugReactQuery = debugReactQueryParam?.toLowerCase() === "true"

  const siteBannerData = useAppBoundStore((state) => state.bannerData)

  return (
    <>
      <Head {...metadata} />

      <DebugGrid />

      {isHomepage && siteBannerData && <SiteBanner {...siteBannerData} />}
      <SiteHeader />
      <SiteNav />

      <PageWrapper>{children ?? null}</PageWrapper>

      <SiteFooter />

      {enableDebugReactQuery && <ReactQueryDevtools />}
    </>
  )
}

export default Root
