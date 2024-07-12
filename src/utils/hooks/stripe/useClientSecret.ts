import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ProductType } from "@ts/products/products.types"
import { ApiResponse, ApiError } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  clientSecret: string
}

export interface Props {
  productType: ProductType | null
  productId: string | null
}

export const useClientSecret = ({ productType, productId }: Props) => {
  const shouldMutate = Boolean(
    productId && productType && Object.values(ProductType).includes(productType)
  )

  const {
    mutate,
    isPending,
    error,
    data: res,
  } = useMutation<ApiResponse<ApiData>, ApiError>({
    mutationKey: ["clientSecret", productType, productId],
    // This fn only gets called if the initial check passes,
    // therefore we can safely assert that the params are not null.
    mutationFn: () =>
      axios.post(apiRoutes.payment, {
        productType: productType!,
        productId: productId!,
      }),
  })

  useEffect(() => {
    if (!shouldMutate) return

    mutate()
  }, [shouldMutate, mutate])

  if (error) {
    console.error("Could not fetch client secret", error)
  }

  return {
    isPending,
    error,
    data: res?.data.data.clientSecret || null,
  }
}
