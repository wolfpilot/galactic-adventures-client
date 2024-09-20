import { useSearchParams } from "react-router-dom"

// Types
import { ProductType } from "@ts/products/products.types"

// Utils
import {
  useCreatePaymentIntent,
  useRetrievePaymentIntent,
} from "@utils/hooks/stripe"

export const usePaymentIntent = () => {
  const [searchParams] = useSearchParams()
  const productTypeParam = searchParams.get("productType") as ProductType
  const productIdParam = searchParams.get("productId")
  const paymentIntentIdParam = searchParams.get("payment_intent")
  const clientSecretParam = searchParams.get("payment_intent_client_secret")

  const productType = productTypeParam ?? null
  const productId = productIdParam ?? null
  const paymentIntentId = paymentIntentIdParam ?? null
  const clientSecret = clientSecretParam ?? null

  // Hooks
  const {
    isPending: createIsPending,
    error: createError,
    data: createData,
  } = useCreatePaymentIntent({
    productType,
    productId,
  })

  const {
    isPending: retrieveIsPending,
    error: retrieveError,
    data: retrieveData,
  } = useRetrievePaymentIntent({
    paymentIntentId,
    clientSecret,
  })

  // Parse data
  const isPending = createIsPending || retrieveIsPending
  const error = createError || retrieveError
  const data = createData || retrieveData

  if (error) {
    console.error("Could not fetch payment intent", error)
  }

  return {
    isPending,
    error,
    data,
  }
}
