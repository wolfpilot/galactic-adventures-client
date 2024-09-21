// Data
import { pageData } from "./data/orderPage.data"

// Utils
import { usePaymentBoundStore } from "@utils/stores"
import { formatPrice } from "@utils/helpers/formatter.helpers"
import { getOrderStatusText } from "./utils/helpers"

// Styles
import styles from "./OrderPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"

// Utils
const OrderPage = () => {
  const paymentIntent = usePaymentBoundStore((state) => state.intent)

  if (paymentIntent?.type !== "retrieve") return null

  // Parse data
  const pageHeaderData = pageData.getHeaderData(paymentIntent.id)
  const orderStatusText = getOrderStatusText(paymentIntent.status)
  const formattedPrice = formatPrice({
    currency: paymentIntent.currency,
    amount: paymentIntent.amount / 100,
  })
  const date = new Date(paymentIntent.created * 1000)
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

              {paymentIntent.payment_method?.type && (
                <p>Payment method: {paymentIntent.payment_method.type}</p>
              )}

              {paymentIntent.payment_method.billing_details.email && (
                <p>
                  E-mail: {paymentIntent.payment_method.billing_details.email}
                </p>
              )}

              {formattedDate && <p>Date: {formattedDate}</p>}

              {paymentIntent.metadata.product_name && (
                <p>Products: {paymentIntent.metadata.product_name}</p>
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
