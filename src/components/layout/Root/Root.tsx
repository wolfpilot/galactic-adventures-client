import { useLocation } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Types
import { Props } from "./types"

// Constants
import { metadata } from "@constants/metadata.constants"

// Components
import Head from "@components/layout/Head/Head.tsx"
import { SiteLayout } from "@components/layout/Site"
import DebugGrid from "@components/utils/DebugGrid/DebugGrid"

// Styles
import "@styles/index.css"

const Root = ({ children }: Props) => {
  const location = useLocation()

  const params = new URLSearchParams(location.search)

  const debugReactQueryParam = params.get("debugReactQuery")
  const enableDebugReactQuery = debugReactQueryParam?.toLowerCase() === "true"

  return (
    <>
      <Head {...metadata} />

      <DebugGrid />

      <SiteLayout>{children}</SiteLayout>

      {enableDebugReactQuery && <ReactQueryDevtools />}
    </>
  )
}

export default Root
