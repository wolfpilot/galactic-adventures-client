import { useQuery } from "@tanstack/react-query"

// Types
import { ApiBaseResponse } from "@ts/api.types"
import { type Destination } from "@ts/products/adventures.types"

export type GetAllDestinationsResponse = ApiBaseResponse<{
  destinations: Destination[] | null
}>

// Setup
const { VITE_SERVER_URL = "" } = import.meta.env

const getAllDestinations: Promise<GetAllDestinationsResponse> = fetch(
  `${VITE_SERVER_URL}/products/adventures`
).then((res) => res.json())

export const useGetAllDestinations = () => {
  const {
    status,
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

  return {
    status,
    isPending,
    error,
    data: allDestinationsData?.data.destinations || [],
  }
}
