import { renderHook } from "@testing-library/react"

// Utils
import { updateWindowSize } from "@utils/helpers/test.helpers"

import { useWindowSize } from "./useWindowSize"

describe("useWindowSize", () => {
  it("should get the default jsdom window width and height", () => {
    const { result } = renderHook(() => useWindowSize())

    expect(result.current.width).toBe(1024)
    expect(result.current.height).toBe(768)
  })

  it("should get the correct window width and height on update", () => {
    updateWindowSize({
      width: 1920,
      height: 1080,
    })

    const { result } = renderHook(() => useWindowSize())

    expect(result.current.width).toBe(1920)
    expect(result.current.height).toBe(1080)
  })
})
