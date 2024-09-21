import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Setup
const params = new URLSearchParams(window.location.search)

const debugReactQueryParam = params.get("debugReactQuery")
const enableDebugReactQuery = debugReactQueryParam?.toLowerCase() === "true"

const DebugReactQuery = () => enableDebugReactQuery && <ReactQueryDevtools />

export default DebugReactQuery
