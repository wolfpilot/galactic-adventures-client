import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { type FieldValues } from "react-hook-form"

// Types
import { Props as FormProps } from "./components/form/DestinationForm/types"

// Data
import { wizardStep1Data as data } from "./data/wizardStep1Data"

// Components
import WizardHeader from "@components/form/wizard/WizardHeader/WizardHeader"
import DestinationForm from "./components/form/DestinationForm/DestinationForm"

// Utils
const updateBgImage = (destinationParam: string) => {
  const parsedDestinationParam = destinationParam?.toLowerCase()
  const bgImgPath = `/images/destinations/destination-sol-${parsedDestinationParam}.jpg`

  const imgUrl = new URL(bgImgPath, import.meta.url).href

  document.documentElement.style.setProperty("--bg-url", `url(${imgUrl})`)
}

const WizardStep1Destination = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const destinationParam = searchParams.get("destination")

  const defaultDestination =
    destinationParam || data.formData.fields.destination.defaultValue

  /**
   * Update default destination if not already set
   */
  useEffect(() => {
    if (destinationParam) return

    setSearchParams((newParams) => {
      newParams.set("destination", defaultDestination)
      return newParams
    })
  }, [destinationParam, defaultDestination, setSearchParams])

  /**
   * Update background img based on selected destination
   */
  useEffect(() => {
    if (!destinationParam) return

    updateBgImage(destinationParam)
  }, [destinationParam])

  // Handlers
  const destinationChangeHandler = (e: FieldValues) => {
    const newDestination = e.target.value

    if (!newDestination) return

    setSearchParams((newParams) => {
      newParams.set("destination", newDestination)
      return newParams
    })
  }

  const submitHandler = (data: FieldValues) => {
    // TODO: Validate and submit to BE, then redirect

    console.log(data)

    setSearchParams((newParams) => {
      newParams.set("step", "2")
      return newParams
    })
  }

  // Parse data
  const parsedFormData = {
    ...data.formData,
    fields: {
      ...data.formData.fields,
      destination: {
        ...data.formData.fields.destination,
        defaultValue: defaultDestination,
      },
    },
  }

  const parsedFormProps: FormProps = {
    ...parsedFormData,
    destinationChangeHandler,
    submitHandler,
  }

  return (
    <>
      <WizardHeader {...data.headerData} />
      <DestinationForm {...parsedFormProps} />
    </>
  )
}

export default WizardStep1Destination
