import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Components
import Head from "./components/layout/Head/Head.tsx"
import App from "./App.tsx"

// React Query
const queryClient = new QueryClient()

const search = window.location.search
const params = new URLSearchParams(search)

const debugReactQueryParam = params.get("debugReactQuery")
const enableDebugReactQuery = debugReactQueryParam?.toLowerCase() === "true"

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <Head />

    <App />

    {enableDebugReactQuery && <ReactQueryDevtools />}
  </QueryClientProvider>
)

export default Root
