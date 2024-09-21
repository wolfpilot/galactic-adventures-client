import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ApiResponse, ApiError } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  publishable_key: string
}

/**
 * Why not store locally as an ENV var?
 *
 * As recommended by Matthew Ling @Stripe, storing the key in only one place makes it easier
 * to change it if needed, particularly if the APIs are consumed by multiple clients,
 * ex: website, mobile app, etc.
 */
export const usePublicKey = () => {
  const {
    isPending,
    error,
    data: res,
  } = useQuery<ApiResponse<ApiData>, ApiError>({
    queryKey: ["publicKey"],
    queryFn: () => axios.get(apiRoutes.payment.index),
  })

  if (error) {
    console.error("Could not fetch public key", error)
  }

  return {
    isPending,
    error,
    data: res?.data.data.publishable_key || null,
  }
}
