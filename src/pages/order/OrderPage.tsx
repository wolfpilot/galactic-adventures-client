import { useEffect } from "react"
import { useSearchParams, useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

// Types
import { ProductType } from "@ts/products/products.types"

// Data
import { pageData } from "./data/orderPage.data"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { orderLoader as loader } from "@utils/loaders"
import { getProductByTypeAndIdQuery as query } from "@utils/queries"
import { formatPrice } from "@utils/helpers/formatter.helpers"
import { getOrderStatusText } from "./utils/helpers"
import { useRetrievePaymentIntent } from "@utils/hooks/stripe"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"

const OrderPage = () => {
  const updateAppIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const [searchParams] = useSearchParams()
  const clientSecretParam = searchParams.get("payment_intent_client_secret")

  const productTypeParam = searchParams.get("productType") as ProductType
  const productIdParam = searchParams.get("productId")

  const productType = productTypeParam || null
  const productId = productIdParam || null

  // Fetch cached or fresh data
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >

  const { isPending: productIsPending, data: productData } = useQuery({
    ...query({
      type: productType,
      id: productId,
    }),
    initialData,
  })

  // Hooks
  const { isPending: paymentIntentIsPending, data: paymentIntentData } =
    useRetrievePaymentIntent({
      clientSecret: clientSecretParam,
    })

  const data = {
    paymentIntent: paymentIntentData,
    product: productData?.product,
  }

  const isPending = productIsPending || paymentIntentIsPending
  const hasData = !!(data.product || data.paymentIntent)

  useEffect(() => {
    updateAppIsLoading(isPending)
  }, [isPending, updateAppIsLoading])

  if (!hasData) return null

  // Parse data
  const orderStatusText = getOrderStatusText(data.paymentIntent?.status)

  return (
    <>
      <Head {...pageData.metadata} />

      <PageHeader {...pageData.headerData} />

      <PageContent>
        <Container>
          <ContentRow>
            <ContentBlock>
              <p>{orderStatusText}</p>
              <br />

              {data.paymentIntent?.id && (
                <p>Order ID: {data.paymentIntent.id.toUpperCase()}</p>
              )}

              {data.product.waypoint?.name && (
                <p>Product: {data.product.waypoint.name}</p>
              )}

              {data.paymentIntent?.currency && data.paymentIntent.amount && (
                <p>
                  Amount:{" "}
                  {formatPrice({
                    currency: data.paymentIntent.currency,
                    amount: data.paymentIntent.amount / 100,
                  })}
                </p>
              )}
            </ContentBlock>
          </ContentRow>
        </Container>
      </PageContent>
    </>
  )
}

export default OrderPage
