import { useSearchParams, useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useStripe } from "@stripe/react-stripe-js"

// Types
import { ProductType } from "@ts/products/products.types"

// Data
import { orderPageData } from "./data/orderPage.data"

// Utils
import { formatPrice } from "@utils/helpers/formatter.helpers"
import { getOrderStatusText } from "./utils/helpers"

// Hooks
import { orderLoader as loader } from "@utils/loaders"
import { getProductByTypeAndIdQuery as query } from "@utils/queries"
import { useRetrievePaymentIntent } from "@utils/hooks/stripe"

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

  // Fetch cached or new data
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >

  const { data: queryData } = useQuery({
    ...query({
      type: productType,
      id: productId,
    }),
    initialData,
  })

  const productData = queryData?.data?.data?.product

  // Hooks
  const {
    isPending: paymentIntentIsPending,
    error: paymentIntentError,
    data: paymentIntentData,
  } = useRetrievePaymentIntent({
    stripe,
    clientSecret: clientSecretParam,
  })

  // Parse data
  const orderStatusText = getOrderStatusText(paymentIntentData?.status)

  const criticalError = paymentIntentError
  const isPending = paymentIntentIsPending
  const hasData = !!(paymentIntentData && productData)

  if (criticalError) {
    throw criticalError
  }

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
    </>
  )
}

export default OrderPage
