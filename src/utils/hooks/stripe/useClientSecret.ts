import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"

// Types
import { ProductType } from "@ts/products/products.types"
import { ApiBaseResponse } from "@ts/api.types"

export interface Props {
  productType: ProductType
  productId: number
}

export type PostPaymentIntentResponse = ApiBaseResponse<{
  clientSecret: string
}>

export type PostPaymentIntent = ({
  productType,
  productId,
}: Props) => Promise<PostPaymentIntentResponse>

// Setup
const { VITE_SERVER_URL = "" } = import.meta.env

const postPaymentIntent: PostPaymentIntent = ({ productType, productId }) =>
  fetch(`${VITE_SERVER_URL}/payment`, {
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
  }, [mutate, productId, productType])

  if (error) {
    console.log("Could not fetch client secret", error)
  }

  return {
    isPending,
    error,
    data: clientSecretData?.data.clientSecret || "",
  }
}
