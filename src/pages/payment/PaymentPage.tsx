import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useStripe, useElements } from "@stripe/react-stripe-js"

// Types
import { ProductType } from "@ts/products/products.types"

// Constants
import { BASE_ROUTE, routes } from "@constants/routes.constants"
import { errors } from "@constants/errors.constants"

// Data
import { pageData } from "./data/paymentPage.data"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { useClientSecret, useRetrievePaymentIntent } from "@utils/hooks/stripe"

// Styles
import styles from "./PaymentPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"
import PaymentForm from "./components/form/PaymentForm/PaymentForm"

const PaymentPage = () => {
  const updateIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const [formErrorMsg, setFormErrorMsg] = useState<string | undefined>()
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const stripe = useStripe()
  const elements = useElements()

  const [searchParams] = useSearchParams()
  const productTypeParam = searchParams.get("productType") as ProductType
  const productIdParam = searchParams.get("productId")

  const productType = productTypeParam ?? null
  const productId = productIdParam ?? null

  // Hooks
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
    clientSecret: clientSecretData,
  })

  const data = {
    clientSecret: clientSecretData,
    paymentIntent: paymentIntentData,
  }

  const isPending = clientSecretIsPending || paymentIntentIsPending
  const criticalError = clientSecretError || paymentIntentError
  const hasData = !!(data.clientSecret && data.paymentIntent)

  useEffect(() => {
    if (isPending) return

    updateIsLoading(false)
  }, [isPending, updateIsLoading])

  if (criticalError) {
    throw criticalError
  }

  // Handlers
  const handleSubmitError = (message?: string) => {
    const newErrorMsg = message || errors.Unhandled.description

    setFormErrorMsg(newErrorMsg)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements || !data.clientSecret || !data.paymentIntent) {
      handleSubmitError()

      return
    }

    setIsProcessing(true)

    // Prepare Stripe Elements for payments and supply additional data
    elements.update({
      mode: "payment",
      amount: data.paymentIntent.amount,
    })

    const { error: submitError } = await elements.submit()

    if (submitError) {
      handleSubmitError(submitError.message)

      return
    }

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
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

  return (
    <>
      <Head {...pageData.metadata} />

      <PageHeader {...pageData.headerData} />

      {hasData && (
        <PageContent>
          <Container>
            <ContentRow>
              <ContentBlock>
                {data.paymentIntent?.currency && data.paymentIntent?.amount && (
                  <PaymentForm
                    isProcessing={isProcessing}
                    currency={data.paymentIntent.currency}
                    amount={data.paymentIntent.amount / 100}
                    submitHandler={submitHandler}
                  />
                )}
              </ContentBlock>
            </ContentRow>

            {formErrorMsg && (
              <ContentRow>
                <p className={styles.formError}>{formErrorMsg}</p>
              </ContentRow>
            )}
          </Container>
        </PageContent>
      )}
    </>
  )
}

export default PaymentPage
