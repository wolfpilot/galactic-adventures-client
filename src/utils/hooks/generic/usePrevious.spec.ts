import { renderHook } from "@testing-library/react"

import { usePrevious } from "./usePrevious"

describe("usePrevious", () => {
  it("should return undefined on initial render", () => {
    const { result } = renderHook(({ count }) => usePrevious(count), {
      initialProps: { count: 0 },
    })

    expect(result.current).toBeUndefined()
  })

  it("should return previous state after each update", () => {
    const { result, rerender } = renderHook(({ count }) => usePrevious(count), {
      initialProps: { count: 0 },
    })

    rerender({ count: 5 })
    expect(result.current).toBe(0)

    rerender({ count: 10 })
    expect(result.current).toBe(5)

    rerender({ count: 100 })
    expect(result.current).toBe(10)
  })
})
