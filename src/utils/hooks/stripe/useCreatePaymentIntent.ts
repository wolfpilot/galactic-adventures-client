import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type { PaymentIntent } from "@stripe/stripe-js"

// Types
import { ProductType } from "@ts/products/products.types"
import type { ApiResponse, ApiError } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  paymentIntent: {
    id: PaymentIntent["id"]
    client_secret: PaymentIntent["client_secret"]
    amount: PaymentIntent["amount"]
    currency: PaymentIntent["currency"]
  }
}

export interface ApiDataCreate extends ApiData {
  type: "create"
}

export interface Props {
  productType: ProductType | null
  productId: string | null
}

export const useCreatePaymentIntent = ({ productType, productId }: Props) => {
  const isEnabled = !!(
    productId &&
    productType &&
    Object.values(ProductType).includes(productType)
  )

  const {
    mutate,
    isPending,
    error,
    data: res,
  } = useMutation<ApiResponse<ApiData>, ApiError>({
    mutationKey: ["createPaymentIntent", productType, productId],
    // This fn only gets called if the initial check passes,
    // therefore we can safely assert that the params are not null.
    mutationFn: () =>
      axios.post(apiRoutes.payment.intent, {
        productType: productType!,
        productId: productId!,
      }),
  })

  useEffect(() => {
    if (!isEnabled) return

    mutate()
  }, [isEnabled, mutate])

  if (error) {
    console.error("Could not create payment intent", error)
  }

  // Format response
  const resData = res?.data.data
  const data = resData
    ? ({
        ...resData,
        type: "create",
      } as ApiDataCreate)
    : null

  return {
    // Ensure hook doesn't hang in pending state if it's not supposed to fire
    isPending: isEnabled === false ? false : isPending,
    error,
    data,
  }
}
