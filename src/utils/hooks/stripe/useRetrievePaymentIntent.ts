import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// Types
import type { PaymentIntentResult } from "@stripe/stripe-js"
import type { ApiResponse, ApiError } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  paymentIntent: PaymentIntentResult["paymentIntent"]
}

export interface Props {
  id: string | null
}

export const useRetrievePaymentIntent = ({ id }: Props) => {
  const {
    isPending,
    error,
    data: res,
  } = useQuery<ApiResponse<ApiData>, ApiError>({
    enabled: !!id,
    queryKey: ["paymentIntent", id],
    queryFn: () => axios.get(`${apiRoutes.payment.intent}/${id}`),
  })

  if (error) {
    console.error("Could not fetch payment intent", error)
  }

  return {
    isPending,
    error,
    data: res?.data.data || null,
  }
}
