import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

// Types
import {
  type Props as FormProps,
  type FormData,
} from "./components/form/DestinationForm/types"

// Data
import { wizardStep1Data } from "./data/wizardStep1Data"

// Utils
import {
  generateMetadata,
  generateFieldsData,
  updateBgImage,
} from "./utils/helpers"

// Hooks
import { useGetAllDestinations } from "./hooks"

// Styles
import styles from "./WizardStep1Destination.module.css"

// Components
import Head from "@components/layout/Head/Head"
import WizardHeader from "@components/form/wizard/WizardHeader/WizardHeader"
import DestinationForm from "./components/form/DestinationForm/DestinationForm"

const WizardStep1Destination = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const destinationIdParam = searchParams.get("destinationId")

  const {
    isPending: allDestinationsIsPending,
    error: allDestinationsError,
    data: allDestinationsData,
  } = useGetAllDestinations()

  const activeDestinationId = destinationIdParam
    ? parseInt(destinationIdParam, 10)
    : undefined

  const activeDestinationData = activeDestinationId
    ? allDestinationsData.find((item) => item.id === activeDestinationId)
    : undefined

  const isDestinationInvalid = destinationIdParam && !activeDestinationData

  /**
   * Update default destination if not already set
   */
  useEffect(() => {
    if (destinationIdParam || !activeDestinationId) return

    setSearchParams((newParams) => {
      newParams.set("destinationId", activeDestinationId.toString())
      return newParams
    })
  }, [destinationIdParam, activeDestinationId, setSearchParams])

  /**
   * Update background img based on selected destination
   */
  useEffect(() => {
    const newDestinationCode = activeDestinationData?.code || ""

    updateBgImage(newDestinationCode)
  }, [activeDestinationData?.code])

  // Handlers
  const destinationChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDestinationId = e.target.value

    if (!newDestinationId) return

    setSearchParams((newParams) => {
      newParams.set("destinationId", newDestinationId)
      return newParams
    })
  }

  const submitHandler = (data: FormData) => {
    // TODO: Post to BE, validate, then redirect

    console.log("data", data)

    setSearchParams((newParams) => {
      newParams.set("step", "2")
      return newParams
    })
  }

  // Parse data
  const parsedMetadata = generateMetadata({
    destinationName: activeDestinationData?.name || "",
    metadata: wizardStep1Data.metadata,
  })

  const parsedFormProps: FormProps = {
    fields: generateFieldsData({
      data: allDestinationsData,
      activeDestinationId,
    }),
    destinationChangeHandler,
    submitHandler,
  }

  return (
    <>
      <Head {...parsedMetadata} />

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <WizardHeader {...wizardStep1Data.headerData} />

          {allDestinationsData.length > 0 && (
            <DestinationForm {...parsedFormProps} />
          )}
        </div>

        <div className={styles.dataSheet}>
          {allDestinationsIsPending && <p>Loading...</p>}

          {(allDestinationsError || isDestinationInvalid) && (
            <p>
              Oops, can't find destination! Please select a new configuration
              for your new exciting adventure.
            </p>
          )}

          {activeDestinationData && (
            <>
              {activeDestinationData.description && (
                <p>{activeDestinationData.description}</p>
              )}

              {activeDestinationData.category && (
                <p>Category: {activeDestinationData.category}</p>
              )}

              {activeDestinationData.price && (
                <p>Price: {activeDestinationData.price}</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default WizardStep1Destination
