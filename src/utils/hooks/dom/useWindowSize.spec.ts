import { renderHook } from "@testing-library/react"

import { useWindowSize } from "./useWindowSize"

/**
 * Update the pre-defined jsdom window object
 *
 * For more info, see:
 * https://stackoverflow.com/a/60817030
 */
export const updateWindowSize = ({
  width,
  height,
}: {
  width?: number
  height?: number
}) => {
  const windowPropsConfig = {
    writable: true,
    configurable: true,
  }

  if (typeof width !== "undefined") {
    Object.defineProperty(window, "innerWidth", {
      ...windowPropsConfig,
      value: width,
    })
  }

  if (typeof height !== "undefined") {
    Object.defineProperty(window, "innerHeight", {
      ...windowPropsConfig,
      value: height,
    })
  }

  window.dispatchEvent(new Event("resize"))
}

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
