import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Constants
import { metadata } from "@constants/metadata.constants"

// Components
import Head from "@components/layout/Head/Head.tsx"
import { SiteHeader, SiteFooter } from "@components/layout/Site"
import { PageWrapper } from "@components/layout/Page"

// Styles
import "@styles/index.css"

const search = window.location.search
const params = new URLSearchParams(search)

const debugReactQueryParam = params.get("debugReactQuery")
const enableDebugReactQuery = debugReactQueryParam?.toLowerCase() === "true"

const Root = () => (
  <>
    <Head {...metadata} />

    <SiteHeader />
    <PageWrapper />
    <SiteFooter />

    {enableDebugReactQuery && <ReactQueryDevtools />}
  </>
)

export default Root
