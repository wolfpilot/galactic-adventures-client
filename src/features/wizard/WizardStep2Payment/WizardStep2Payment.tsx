import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"

// Types
import { Props as FormProps } from "./components/form/PaymentForm/types"

// Hooks
import { usePublicKey, useClientSecret } from "@utils/hooks/stripe"

// Data
import { wizardStep2Data as data } from "./data/wizardStep2Data"

// Components
import WizardHeader from "@components/form/wizard/WizardHeader/WizardHeader"
import PaymentForm from "./components/form/PaymentForm/PaymentForm"

const WizardStep2Payment = () => {
  const [stripe, setStripe] = useState<FormProps["stripe"]>(null)

  const publicKey = usePublicKey()
  const clientSecret = useClientSecret()

  // Hooks
  useEffect(() => {
    if (!publicKey.data) return

    setStripe(loadStripe(publicKey.data))
  }, [publicKey.data])

  const isPending = publicKey.isPending || clientSecret.isPending
  const error = publicKey.error || clientSecret.error
  const hasData = !!(publicKey.data && clientSecret.data)

  const options = {
    clientSecret: clientSecret.data,
  }

  return (
    <>
      <WizardHeader {...data.headerData} />

      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Oops, something went wrong</p>
      ) : hasData ? (
        <PaymentForm stripe={stripe} options={options} />
      ) : null}
    </>
  )
}

export default WizardStep2Payment
