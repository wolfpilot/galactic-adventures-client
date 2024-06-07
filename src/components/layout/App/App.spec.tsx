import { render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "./App"

// Setup
const queryClient = new QueryClient()

describe("App", () => {
  it("renders the App component", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    screen.debug() // prints out the jsx in the App component unto the command line
  })
})
