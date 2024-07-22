import { HelmetProvider } from "react-helmet-async"

// Utils
import {
  RouterProvider,
  QueryProvider,
  StripeProvider,
} from "@utils/providers/"
import { render, screen } from "@testing-library/react"

describe("PageWrapper", () => {
  it("renders the PageWrapper component", () => {
    render(
      <QueryProvider>
        <StripeProvider>
          <HelmetProvider>
            <RouterProvider />
          </HelmetProvider>
        </StripeProvider>
      </QueryProvider>
    )

    screen.debug() // prints out the jsx in the PageWrapper component unto the command line
  })
})
