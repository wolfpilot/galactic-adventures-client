import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Components
import Head from "@components/layout/Head/Head.tsx"
import App from "@components/layout/App/App.tsx"

// Styles
import "@styles/index.css"

// React Query
const queryClient = new QueryClient()

const search = window.location.search
const params = new URLSearchParams(search)

const debugReactQueryParam = params.get("debugReactQuery")
const enableDebugReactQuery = debugReactQueryParam?.toLowerCase() === "true"

const Root = () => (
  <HelmetProvider>
    <Head />

    <QueryClientProvider client={queryClient}>
      <App />

      {enableDebugReactQuery && <ReactQueryDevtools />}
    </QueryClientProvider>
  </HelmetProvider>
)

export default Root
