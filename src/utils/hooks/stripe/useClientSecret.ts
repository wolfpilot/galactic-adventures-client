import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"

// Types
import { ProductType } from "@ts/products/products.types"
import { ApiBaseResponse } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export type PostPaymentIntentResponse = ApiBaseResponse<{
  clientSecret: string
}>

export type PostPaymentIntent = ({
  productType,
  productId,
}: Props) => Promise<PostPaymentIntentResponse>

export interface Props {
  productType: ProductType | null
  productId: number | null
}

const postPaymentIntent: PostPaymentIntent = ({ productType, productId }) =>
  fetch(apiRoutes.payment, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productType,
      productId,
    }),
  }).then((res) => res.json())

export const useClientSecret = ({ productType, productId }: Props) => {
  const options = {
    productType,
    productId,
  }

  const {
    mutate,
    isPending,
    error,
    data: clientSecretData,
  } = useMutation({
    mutationKey: ["clientSecret", productType, productId],
    mutationFn: () => postPaymentIntent(options),
  })

  useEffect(() => {
    if (
      !productId ||
      !productType ||
      !Object.values(ProductType).includes(productType)
    ) {
      return
    }

    mutate()
  }, [productType, productId, mutate])

  // Check for network errors
  if (error) {
    return {
      isPending,
      error,
      data: "",
    }
  }

  // Check for HTTP errors
  if (!clientSecretData?.ok) {
    return {
      isPending: false,
      error: new Error(clientSecretData?.message),
      data: "",
    }
  }

  return {
    isPending,
    error,
    data: clientSecretData.data.clientSecret,
  }
}
