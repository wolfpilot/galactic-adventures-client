import { render, screen } from "@testing-library/react"

// Utils
import { mockSearchParams, mockWindowSize } from "@utils/helpers/test.helpers"

// Components
import DebugGrid from "./DebugGrid"

// Setup
const mockProps = {
  grid: {
    columnsCount: 12,
  },
  window: {
    width: 1920,
    height: 1080,
  },
}

describe("DebugGrid", () => {
  describe("given all params are provided", () => {
    it("should render the correct number of columns", () => {
      mockSearchParams("debugGrid=true")
      document.documentElement.style.setProperty(
        "--grid-columns-count",
        `${mockProps.grid.columnsCount}`
      )

      render(<DebugGrid />)

      const listItems = screen.getAllByRole("listitem")

      expect(listItems.length).toBe(mockProps.grid.columnsCount)
      listItems.forEach((item, index) =>
        expect(item).toHaveTextContent(`${index + 1}`)
      )
    })

    it("should show the current window size", () => {
      mockWindowSize(mockProps.window)

      mockSearchParams("debugGrid=true")
      document.documentElement.style.setProperty(
        "--grid-columns-count",
        `${mockProps.grid.columnsCount}`
      )

      render(<DebugGrid />)

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        `${mockProps.window.width} x ${mockProps.window.height}`
      )
    })
  })

  describe("when the grid is disabled via the URL search params", () => {
    it("should not render", () => {
      mockSearchParams("debugGrid=false")
      document.documentElement.style.setProperty(
        "--grid-columns-count",
        `${mockProps.grid.columnsCount}`
      )

      const { container } = render(<DebugGrid />)

      expect(container).toBeEmptyDOMElement()
    })
  })

  describe("when the URL search params are not set", () => {
    it("should not render", () => {
      document.documentElement.style.setProperty(
        "--grid-columns-count",
        `${mockProps.grid.columnsCount}`
      )

      const { container } = render(<DebugGrid />)

      expect(container).toBeEmptyDOMElement()
    })
  })
})
