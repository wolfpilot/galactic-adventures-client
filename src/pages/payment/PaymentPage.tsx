import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useStripe, useElements } from "@stripe/react-stripe-js"

// Types
import { ProductType } from "@ts/products/products.types"

// Constants
import { BASE_ROUTE, routes } from "@constants/routes.constants"

// Data
import { pageData } from "./data/paymentPage.data"

// Utils
import { useClientSecret, useRetrievePaymentIntent } from "@utils/hooks/stripe"

// Styles
import styles from "./PaymentPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import PageHeader from "@components/layout/PageHeader/PageHeader"
import PaymentForm from "./components/form/PaymentForm/PaymentForm"

const PaymentPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const stripe = useStripe()
  const elements = useElements()

  const [searchParams] = useSearchParams()
  const productTypeParam = searchParams.get("productType") as ProductType
  const productIdParam = searchParams.get("productId")

  const productType = productTypeParam ?? null
  const productId = productIdParam ?? null

  const {
    isPending: clientSecretIsPending,
    error: clientSecretError,
    data: clientSecretData,
  } = useClientSecret({
    productType,
    productId,
  })

  const {
    isPending: paymentIntentIsPending,
    error: paymentIntentError,
    data: paymentIntentData,
  } = useRetrievePaymentIntent({
    stripe,
    clientSecret: clientSecretData,
  })

  // Utils
  const handleError = (message?: string) => {
    const newErrorMessage = message || "An unexpected error occurred."

    setErrorMessage(newErrorMessage)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecretData || !paymentIntentData) {
      handleError("Oops, something went wrong! Please try again later.")

      return
    }

    setIsProcessing(true)

    // Prepare Stripe Elements for payments and supply additional data
    elements.update({
      mode: "payment",
      amount: paymentIntentData.amount,
    })

    const { error: submitError } = await elements.submit()

    if (submitError) {
      handleError(submitError.message)

      return
    }

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecretData,
      confirmParams: {
        // URL to redirect the user to if no error occurs
        return_url: `${BASE_ROUTE}${routes.order.url}?productType=${productTypeParam}&productId=${productIdParam}`,
      },
    })

    if (
      paymentError?.type === "card_error" ||
      paymentError?.type === "validation_error"
    ) {
      handleError(paymentError.message)

      return
    }

    handleError()
    setIsProcessing(false)
  }

  // Parse data
  const isPending = clientSecretIsPending || paymentIntentIsPending
  const error =
    clientSecretError?.message || paymentIntentError?.message || errorMessage
  const hasData = !!(
    clientSecretData &&
    paymentIntentData?.currency &&
    paymentIntentData?.amount
  )

  return (
    <>
      <Head {...pageData.metadata} />

      <PageHeader {...pageData.headerData} />

      {isPending && <p>Loading...</p>}

      {hasData && (
        <div className={styles.formWrapper}>
          <PaymentForm
            isProcessing={isProcessing}
            currency={paymentIntentData.currency}
            amount={paymentIntentData.amount / 100}
            submitHandler={submitHandler}
          />
        </div>
      )}

      {error && <p>{error}</p>}
    </>
  )
}

export default PaymentPage
