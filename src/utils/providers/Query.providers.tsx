import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export interface Props {
  children: React.ReactNode
}

// Setup
const queryClient = new QueryClient()

const QueryProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default QueryProvider
