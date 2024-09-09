import { useEffect, useRef } from "react"

export const usePrevious = <T>(val: T): T | undefined => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = val
  }, [val])

  return ref.current
}
