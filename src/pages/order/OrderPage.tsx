import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

// Types
import { PaymentIntentMetadata } from "@ts/payment/payment.types"

// Data
import { pageData } from "./data/orderPage.data"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { parseJSON } from "@utils/helpers/object.helpers"
import { formatPrice } from "@utils/helpers/formatter.helpers"
import { getOrderStatusText } from "./utils/helpers"
import { useRetrievePaymentIntent } from "@utils/hooks/stripe"

// Styles
import styles from "./OrderPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"

// Utils
const OrderPage = () => {
  const updateAppIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const [searchParams] = useSearchParams()
  const paymentIntentIdParam = searchParams.get("payment_intent")

  // Hooks
  const { isPending, data } = useRetrievePaymentIntent({
    id: paymentIntentIdParam,
  })

  useEffect(() => {
    updateAppIsLoading(isPending)
  }, [isPending, updateAppIsLoading])

  if (!data?.paymentIntent) return null

  // Parse data
  const pageHeaderData = pageData.getHeaderData(data.paymentIntent.id)
  const orderStatusText = getOrderStatusText(data.paymentIntent.status)
  const metadata = parseJSON<PaymentIntentMetadata>(
    data.paymentIntent.description
  )
  const formattedPrice = formatPrice({
    currency: data.paymentIntent.currency,
    amount: data.paymentIntent.amount / 100,
  })
  const date = new Date(data.paymentIntent.created * 1000)
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Head {...pageData.metadata} />

      <PageHeader className={styles.pageHeader} {...pageHeaderData} />

      <PageContent>
        <Container>
          <ContentRow>
            <ContentBlock>
              <p>Status: {orderStatusText}</p>
              <br />
              {formattedDate && <p>Date: {formattedDate}</p>}
              {metadata?.product?.name && (
                <p>Products: {metadata.product.name}</p>
              )}
              {formattedPrice && <p>Total: {formattedPrice}</p>}
            </ContentBlock>
          </ContentRow>
        </Container>
      </PageContent>
    </>
  )
}

export default OrderPage
