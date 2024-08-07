"use client"

import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"

// Utils
import { useWindowSize } from "@utils/hooks/dom/useWindowSize"
import { useBoundStore } from "@utils/stores/store"

// Styles
import styles from "./DebugGrid.module.css"

const DebugGrid: React.FC = () => {
  const showDebugGrid = useBoundStore((state) => state.showDebugGrid)
  const updateShowDebugGrid = useBoundStore(
    (state) => state.updateShowDebugGrid
  )

  const [columnsNr, setColumnsNr] = useState<number>(0)

  const { width, height } = useWindowSize()

  const [searchParams] = useSearchParams()
  const debugGridParam = searchParams.get("debugGrid")

  /**
   * Update the App ctx if debugGrid param is found
   */
  useEffect(() => {
    if (debugGridParam === null) return

    // Parse string for value and mixed case typing
    const newDebugGridParam = /true/i.test(debugGridParam)

    updateShowDebugGrid(newDebugGridParam)
  }, [debugGridParam, updateShowDebugGrid])

  /**
   * Update the number of columns from the DOM
   */
  useEffect(() => {
    const baseColumnsStr = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--grid-columns-count")
    const baseColumnsNr = parseInt(baseColumnsStr, 10)

    setColumnsNr(baseColumnsNr)
  }, [width, height])

  if (
    // Check if it's enabled in the App State
    !showDebugGrid ||
    // Check if all necessary params are available
    !(width || height || columnsNr)
  ) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.info}>
        {width} x {height}
      </h2>

      <div className={styles.grid}>
        {new Array(columnsNr).fill(0).map((_, index) => (
          <div className={styles.column} key={index}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DebugGrid
