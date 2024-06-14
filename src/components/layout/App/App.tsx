import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

// Styles
import styles from "./App.module.css"

// Components
import {
  WizardStep1Destination,
  WizardStep2Payment,
  WizardStep3Complete,
} from "@features/wizard/"

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const stepParam = searchParams.get("step")

  /**
   * Update default step to 1 if not already set
   */
  useEffect(() => {
    if (stepParam) return

    setSearchParams((newParams) => {
      newParams.set("step", "1")
      return newParams
    })
  }, [stepParam, setSearchParams])

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        {stepParam === "1" ? (
          <WizardStep1Destination />
        ) : stepParam === "2" ? (
          <WizardStep2Payment />
        ) : stepParam === "3" ? (
          <WizardStep3Complete />
        ) : null}
      </div>
    </main>
  )
}

export default App
