import { useSearchParams } from "react-router-dom"
import { useStripe } from "@stripe/react-stripe-js"

// Data
import { wizardStep3Data } from "./data/wizardStep3Data"

// Utils
import { getFormattedPrice } from "@utils/helpers/number.helpers"
import { getOrderStatusText } from "./utils/helpers"

// Hooks
import { useRetrievePaymentIntent } from "@utils/hooks/stripe"
import { useGetDestinationById } from "@utils/hooks/products"

// Components
import Head from "@components/layout/Head/Head"
import WizardHeader from "@components/form/wizard/WizardHeader/WizardHeader"

const WizardStep3Complete = () => {
  const stripe = useStripe()

  const [searchParams] = useSearchParams()
  const clientSecretParam = searchParams.get("payment_intent_client_secret")
  const destinationIdParam = searchParams.get("destinationId")

  const {
    isPending: paymentIntentIsPending,
    error: paymentIntentError,
    data: paymentIntentData,
  } = useRetrievePaymentIntent({
    stripe,
    clientSecret: clientSecretParam,
  })

  const activeDestinationId = destinationIdParam
    ? parseInt(destinationIdParam, 10)
    : NaN

  const {
    isPending: destinationIsPending,
    error: destinationError,
    data: destinationData,
  } = useGetDestinationById({
    id: activeDestinationId,
  })

  // Parse data
  const orderStatusText = getOrderStatusText(paymentIntentData?.status)

  const isPending = paymentIntentIsPending || destinationIsPending
  const error = paymentIntentError || destinationError
  const hasData = !!(paymentIntentData && destinationData)

  return (
    <>
      <Head {...wizardStep3Data.metadata} />

      <WizardHeader {...wizardStep3Data.headerData} />

      <div>
        {isPending && <p>Loading...</p>}

        {error && <p>Oops, something went wrong</p>}

        {hasData && (
          <>
            <p>{orderStatusText}</p>
            <br />
            <p>Order ID: {paymentIntentData.id.toUpperCase()}</p>
            <p>Product: {destinationData.name}</p>
            <p>
              Amount:{" "}
              {getFormattedPrice({
                currency: paymentIntentData.currency,
                amount: paymentIntentData.amount / 100,
              })}
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default WizardStep3Complete
