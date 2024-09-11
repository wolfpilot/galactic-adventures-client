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
import { PageHeader } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"
import PaymentForm from "./components/form/PaymentForm/PaymentForm"

const PaymentPage = () => {
  const [formErrorMsg, setFormErrorMsg] = useState<string | undefined>()
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
  const handleSubmitError = (message?: string) => {
    const newErrorMsg = message || "An unexpected error occurred."

    setFormErrorMsg(newErrorMsg)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecretData || !paymentIntentData) {
      handleSubmitError("Oops, something went wrong! Please try again later.")

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
      handleSubmitError(submitError.message)

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
      handleSubmitError(paymentError.message)

      return
    }

    handleSubmitError()
    setIsProcessing(false)
  }

  // Parse data
  const criticalError = clientSecretError || paymentIntentError
  const isPending = clientSecretIsPending || paymentIntentIsPending
  const hasData = !!(clientSecretData && paymentIntentData)

  if (criticalError) {
    throw criticalError
  }

  const headerProps = pageData.getHeaderProps(isPending)

  return (
    <>
      <Head {...pageData.metadata} />

      <PageHeader {...headerProps} />

      {hasData && (
        <Container>
          <ContentRow>
            <ContentBlock>
              <PaymentForm
                isProcessing={isProcessing}
                currency={paymentIntentData.currency}
                amount={paymentIntentData.amount / 100}
                submitHandler={submitHandler}
              />
            </ContentBlock>
          </ContentRow>

          {formErrorMsg && (
            <ContentRow>
              <p className={styles.formError}>{formErrorMsg}</p>
            </ContentRow>
          )}
        </Container>
      )}
    </>
  )
}

export default PaymentPage
