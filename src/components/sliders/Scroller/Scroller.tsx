import { useRef, useState, useEffect } from "react"
import ScrollContainer, {
  ScrollContainerProps,
} from "react-indiana-drag-scroll"

// Utils
import { isElemScrollable } from "@utils/helpers/dom.helpers"
import { useWindowSize } from "@utils/hooks/dom"

// Styles
import styles from "./Scroller.module.css"

// Components
import { GrabIndicator } from "@components/indicators"

const Scroller = ({ children, className = "" }: ScrollContainerProps) => {
  const ref = useRef<HTMLElement | null>(null)

  const [hasInteracted, setHasInteracted] = useState(false)
  const [isScrollable, setIsScrollable] = useState(false)

  const windowSize = useWindowSize()

  // Hooks
  useEffect(() => {
    setHasInteracted(false)
  }, [children])

  useEffect(() => {
    if (!ref.current) return

    setIsScrollable(isElemScrollable(ref.current))
  }, [ref, children, windowSize.width, windowSize.height])

  // Handlers
  const handleOnInteract = () => {
    if (hasInteracted) return

    setHasInteracted(true)
  }

  return (
    <div
      className={`
        ${styles.wrapper}
        ${className}
      `}
    >
      <ScrollContainer
        className={`
          ${styles.scroller}
          ${isScrollable ? "IS_GRABBABLE" : ""}
          ${isScrollable ? styles.scroller__isScrollable : ""}
          ${hasInteracted ? styles.scroller__hasInteracted : ""}
        `}
        vertical={false}
        draggingClassName="IS_GRABBING"
        innerRef={ref}
        onClick={handleOnInteract}
        onStartScroll={handleOnInteract}
      >
        {children}
      </ScrollContainer>

      {isScrollable && (
        <GrabIndicator
          className={`
            ${styles.indicator}
            ${hasInteracted ? styles.indicator__hasInteracted : ""}
          `}
        />
      )}
    </div>
  )
}

export default Scroller
