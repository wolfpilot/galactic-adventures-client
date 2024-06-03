import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"

// Types
import { ApiBaseResponse } from "@ts/api.types"

export type PostPaymentIntentResponse = ApiBaseResponse<{
  clientSecret: string
}>

// Setup
const { VITE_SERVER_URL = "" } = import.meta.env

const postPaymentIntent: Promise<PostPaymentIntentResponse> = fetch(
  `${VITE_SERVER_URL}/payment`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }
).then((res) => res.json())

export const useClientSecret = () => {
  const {
    mutate,
    isPending,
    error,
    data: clientSecretData,
  } = useMutation({
    mutationFn: () => postPaymentIntent,
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  if (error) {
    console.log("Could not fetch client secret", error)
  }

  return {
    isPending: isPending,
    error: error,
    data: clientSecretData?.data.clientSecret || "",
  }
}
