import { HelmetProvider } from "react-helmet-async"

// Utils
import { RouterProvider, QueryProvider } from "@utils/providers/"
import { render } from "@testing-library/react"

describe("PageWrapper", () => {
  it("renders the PageWrapper component", () => {
    render(
      <QueryProvider>
        <HelmetProvider>
          <RouterProvider />
        </HelmetProvider>
      </QueryProvider>
    )
  })
})
