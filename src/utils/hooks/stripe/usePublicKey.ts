import { useQuery } from "@tanstack/react-query"

// Types
import { ApiBaseResponse } from "@ts/api.types"

export type GetPublicKeyResponse = ApiBaseResponse<{
  publishableKey: string
}>

// Setup
const { VITE_SERVER_URL = "" } = import.meta.env

const getPublicKey: Promise<GetPublicKeyResponse> = fetch(
  `${VITE_SERVER_URL}/payment`
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

  return {
    isPending,
    error,
    data: publicKeyData?.data.publishableKey || "",
  }
}
