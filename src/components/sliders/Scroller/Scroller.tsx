import { useRef, useState, useEffect } from "react"
import ScrollContainer, {
  ScrollContainerProps,
} from "react-indiana-drag-scroll"

// Utils
import { isElemScrollable } from "@utils/helpers/dom.helpers"
import { useWindowSize } from "@utils/hooks/dom/useWindowSize"

const Scroller = ({ children, className = "" }: ScrollContainerProps) => {
  const ref = useRef<HTMLElement | null>(null)

  const [isScrollable, setIsScrollable] = useState(false)

  const windowSize = useWindowSize()

  useEffect(() => {
    if (!ref.current) return

    setIsScrollable(isElemScrollable(ref.current))
  }, [ref, windowSize.width, windowSize.height])

  return (
    <ScrollContainer
      className={`${className} ${isScrollable && "IS_GRABBABLE"}`}
      vertical={false}
      hideScrollbars={false}
      draggingClassName="IS_GRABBING"
      innerRef={ref}
    >
      {children}
    </ScrollContainer>
  )
}

export default Scroller
