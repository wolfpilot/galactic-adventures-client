import { useSearchParams } from "react-router-dom"
import { useStripe } from "@stripe/react-stripe-js"

// Types
import { ProductType } from "@ts/products/products.types"

// Data
import { orderPageData } from "./data/orderPage.data"

// Utils
import { formatPrice } from "@utils/helpers/formatter.helpers"
import { getOrderStatusText } from "./utils/helpers"

// Hooks
import { useRetrievePaymentIntent } from "@utils/hooks/stripe"
import { useGetProduct } from "@utils/hooks/products"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"

const OrderPage = () => {
  const stripe = useStripe()

  const [searchParams] = useSearchParams()
  const clientSecretParam = searchParams.get("payment_intent_client_secret")

  const productTypeParam = searchParams.get("productType") as ProductType
  const productIdParam = searchParams.get("productId")

  const productType = productTypeParam ?? null
  const productId = productIdParam ?? null

  const {
    isPending: paymentIntentIsPending,
    error: paymentIntentError,
    data: paymentIntentData,
  } = useRetrievePaymentIntent({
    stripe,
    clientSecret: clientSecretParam,
  })

  const {
    isPending: productIsPending,
    error: productError,
    data: productData,
  } = useGetProduct({
    type: productType,
    id: productId,
  })

  // Parse data
  const orderStatusText = getOrderStatusText(paymentIntentData?.status)

  const isPending = paymentIntentIsPending || productIsPending
  const error = paymentIntentError?.message || productError?.message
  const hasData = !!(paymentIntentData && productData)

  return (
    <>
      <Head {...orderPageData.metadata} />

      <PageHeader {...orderPageData.headerData} />

      {isPending && <p>Loading...</p>}

      {hasData && (
        <Container>
          <ContentRow>
            <ContentBlock>
              <p>{orderStatusText}</p>
              <br />
              <p>Order ID: {paymentIntentData.id.toUpperCase()}</p>
              <p>Product: {productData.waypoint?.name}</p>
              <p>
                Amount:{" "}
                {formatPrice({
                  currency: paymentIntentData.currency,
                  amount: paymentIntentData.amount / 100,
                })}
              </p>
            </ContentBlock>
          </ContentRow>
        </Container>
      )}

      {error && <p>{error}</p>}
    </>
  )
}

export default OrderPage
