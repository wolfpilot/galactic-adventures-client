import { render } from "@testing-library/react"

// Components
import OverlayLoader from "./OverlayLoader"

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
})

describe("OverlayLoader", () => {
  describe("Given ", () => {
    it("should render correctly", () => {
      const { container } = render(<OverlayLoader />)

      const elem = container.firstChild

      expect(elem).toHaveAttribute("aria-hidden", "true")

      /**
       * !NOTE: Test incomplete due to bug related to JS timeouts.
       *
       * @see https://github.com/testing-library/react-testing-library/issues/1198
       *
       * Ideally, it should look something like this:
       *
       * const { result: updateIsLoading } = renderHook(() =>
       *  useAppBoundStore((state) => state.updateIsLoading)
       * )
       *
       * updateIsLoading.current(false)
       *
       * vi.advanceTimersByTime(500) OR await fireEvent.transitionEnd(elem)
       *
       * expect(elem).toHaveAttribute("aria-hidden", "true")
       *
       */
    })
  })
})
