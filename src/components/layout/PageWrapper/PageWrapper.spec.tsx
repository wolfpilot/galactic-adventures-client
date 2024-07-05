import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { render, screen } from "@testing-library/react"

// Components
import Root from "@components/layout/Root/Root"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
])

describe("PageWrapper", () => {
  it("renders the PageWrapper component", () => {
    render(<RouterProvider router={router} />)

    screen.debug() // prints out the jsx in the PageWrapper component unto the command line
  })
})
