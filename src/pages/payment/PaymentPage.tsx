import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useStripe, useElements } from "@stripe/react-stripe-js"

// Constants
import { BASE_ROUTE, routes } from "@constants/routes.constants"

// Data
import { pageData } from "./data/paymentPage.data"

// Utils
import { useAppBoundStore } from "@utils/stores"

// Styles
import styles from "./PaymentPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"
import PaymentForm from "./components/form/PaymentForm/PaymentForm"

const PaymentPage = () => {
  const updateAppIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const [formErrorMsg, setFormErrorMsg] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const stripe = useStripe()
  const elements = useElements()

  const [searchParams] = useSearchParams()
  const productTypeParam = searchParams.get("productType")
  const productIdParam = searchParams.get("productId")

  // Hooks
  useEffect(() => {
    updateAppIsLoading(false)
  }, [updateAppIsLoading])

  // Utils
  const resetError = () => {
    setFormErrorMsg(null)
  }

  const handleSubmitError = (message: string) => {
    const newErrorMsg = message

    setIsProcessing(false)
    setFormErrorMsg(newErrorMsg)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    resetError()

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // URL to redirect the user to if no error occurs
        return_url: `${BASE_ROUTE}${routes.order.url}?productType=${productTypeParam}&productId=${productIdParam}`,
      },
    })

    if (
      (paymentError.type === "card_error" ||
        paymentError.type === "validation_error") &&
      paymentError.message
    ) {
      handleSubmitError(paymentError.message)
    } else {
      handleSubmitError("An unexpected error occurred.")
    }

    setIsProcessing(false)
  }

  return (
    <>
      <Head {...pageData.metadata} />

      <PageHeader {...pageData.headerData} />

      {stripe && elements && (
        <PageContent>
          <Container>
            <ContentRow>
              <ContentBlock>
                <PaymentForm
                  isProcessing={isProcessing}
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
        </PageContent>
      )}
    </>
  )
}

export default PaymentPage
