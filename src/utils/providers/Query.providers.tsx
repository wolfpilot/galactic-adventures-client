import { QueryClientProvider } from "@tanstack/react-query"

// Utils
import { queryClient } from "@utils/clients"

export interface Props {
  children: React.ReactNode
}

const QueryProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default QueryProvider
