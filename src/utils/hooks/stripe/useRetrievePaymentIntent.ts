import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { PaymentIntent, PaymentMethod } from "@stripe/stripe-js"

// Types
import type { ApiResponse, ApiError } from "@ts/api.types"
import type { ProductType } from "@ts/products/products.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  paymentIntent: {
    id: PaymentIntent["id"]
    client_secret: PaymentIntent["client_secret"]
    status: PaymentIntent["status"]
    created: PaymentIntent["created"]
    amount: PaymentIntent["amount"]
    currency: PaymentIntent["currency"]
    payment_method: PaymentMethod
    metadata: {
      productId: number
      productType: ProductType
      productName: string
    }
  }
}

export interface ApiDataRetrieve extends ApiData {
  type: "retrieve"
}

export interface Props {
  paymentIntentId: string | null
  clientSecret: string | null
}

export const useRetrievePaymentIntent = ({
  paymentIntentId,
  clientSecret,
}: Props) => {
  const isEnabled = !!(paymentIntentId && clientSecret)

  const {
    isPending,
    error,
    data: res,
  } = useQuery<ApiResponse<ApiData>, ApiError>({
    enabled: isEnabled,
    queryKey: ["paymentIntent", paymentIntentId],
    queryFn: () => axios.get(`${apiRoutes.payment.intent}/${paymentIntentId}`),
  })

  if (error) {
    console.error("Could not retrieve payment intent", error)
  }

  // Format response
  const resData = res?.data.data

  const data = resData
    ? ({
        ...resData,
        type: "retrieve",
      } as ApiDataRetrieve)
    : null

  return {
    // Ensure hook doesn't hang in pending state if it's not supposed to fire
    isPending: isEnabled === false ? false : isPending,
    error,
    data,
  }
}
