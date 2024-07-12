import { useEffect, useState, useRef } from "react"

// Utils
// import { isClient } from "@utils/domHelper"

export interface WindowSize {
  width: number | null
  height: number | null
}

export type GetWindowSize = () => WindowSize
export type UseWindowSize = () => WindowSize

export const getWindowSize: GetWindowSize = () => {
  return {
    width: document.documentElement.clientWidth || window.innerWidth,
    height: document.documentElement.clientHeight || window.innerHeight,
  }
}

export const useWindowSize: UseWindowSize = () => {
  const rAF = useRef<number | null>(null)

  const initialSizes = getWindowSize()

  const [windowSize, setWindowSize] = useState<WindowSize>(initialSizes)

  const handleResize = () => {
    if (rAF.current === null) {
      rAF.current = window.requestAnimationFrame(() => {
        const newSizes = getWindowSize()

        setWindowSize(newSizes)

        rAF.current = null
      })
    }
    setWindowSize(getWindowSize())
  }

  useEffect(() => {
    // if (!isClient) return

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
