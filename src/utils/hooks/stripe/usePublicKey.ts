import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ApiResponse, ApiError } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  publishableKey: string
}

export const usePublicKey = () => {
  const {
    isPending,
    error,
    data: res,
  } = useQuery<ApiResponse<ApiData>, ApiError>({
    queryKey: ["publicKey"],
    queryFn: () => axios.get(apiRoutes.payment),
  })

  if (error) {
    console.error("Could not fetch public key", error)
  }

  return {
    isPending,
    error,
    data: res?.data.data.publishableKey || null,
  }
}
