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

describe("App", () => {
  it("renders the App component", () => {
    render(<RouterProvider router={router} />)

    screen.debug() // prints out the jsx in the App component unto the command line
  })
})
