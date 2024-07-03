import { useQuery } from "@tanstack/react-query"

// Types
import { ApiBaseResponse } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export type GetPublicKeyResponse = ApiBaseResponse<{
  publishableKey: string
}>

const getPublicKey: Promise<GetPublicKeyResponse> = fetch(
  apiRoutes.payment
).then((res) => res.json())

export const usePublicKey = () => {
  const {
    isPending,
    error,
    data: publicKeyData,
  } = useQuery({
    queryKey: ["publicKey"],
    queryFn: () => getPublicKey,
  })

  if (error) {
    console.log("Could not fetch public key", error)
  }

  // Check for network errors
  if (error) {
    return {
      isPending,
      error,
      data: "",
    }
  }

  // Check for HTTP errors
  if (!publicKeyData?.ok) {
    return {
      isPending: false,
      error: new Error(publicKeyData?.message),
      data: "",
    }
  }

  return {
    isPending,
    error,
    data: publicKeyData.data.publishableKey,
  }
}
