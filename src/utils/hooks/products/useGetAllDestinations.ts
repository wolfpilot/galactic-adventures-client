import { useQuery } from "@tanstack/react-query"

// Types
import { ApiBaseResponse } from "@ts/api.types"
import { type Destination } from "@ts/products/adventures.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export type GetAllDestinationsResponse = ApiBaseResponse<{
  destinations: Destination[] | null
}>

const getAllDestinations: Promise<GetAllDestinationsResponse> = fetch(
  apiRoutes.products.adventures
).then((res) => res.json())

export const useGetAllDestinations = () => {
  const {
    isPending,
    error,
    data: allDestinationsData,
  } = useQuery({
    queryKey: ["allDestinations"],
    queryFn: () => getAllDestinations,
  })

  if (error) {
    console.log("Could not fetch all destinations", error)
  }

  // Check for network errors
  if (error) {
    return {
      isPending,
      error,
      data: [],
    }
  }

  // Check for HTTP errors
  if (!allDestinationsData?.ok) {
    return {
      isPending: false,
      error: new Error(allDestinationsData?.message),
      data: [],
    }
  }

  return {
    isPending,
    error,
    data: allDestinationsData.data.destinations,
  }
}
