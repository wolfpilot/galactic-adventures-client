import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Components
import App from "./App.tsx"

// Assets
import "./index.css"

// Setup
const queryClient = new QueryClient()

const search = window.location.search
const params = new URLSearchParams(search)

const debugReactQueryParam = params.get("debugReactQuery")
const enableDebugReactQuery = debugReactQueryParam?.toLowerCase() === "true"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      {enableDebugReactQuery && <ReactQueryDevtools />}
    </QueryClientProvider>
  </React.StrictMode>
)
