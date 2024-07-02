import { useQuery } from "@tanstack/react-query"

// Types
import { ApiBaseResponse } from "@ts/api.types"
import { type Destination } from "@ts/products/adventures.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export type GetDestinationByIdResponse = ApiBaseResponse<{
  destination: Destination | null
}>

export interface Props {
  id: number
}

const getDestinationById = (id: number): Promise<GetDestinationByIdResponse> =>
  fetch(`${apiRoutes.products.adventures}/${id}`).then((res) => res.json())

export const useGetDestinationById = ({ id }: Props) => {
  const {
    status,
    isPending,
    error,
    data: destinationData,
  } = useQuery({
    queryKey: [`destination-${id}`],
    queryFn: () => getDestinationById(id),
  })

  if (error) {
    console.log("Could not fetch all destinations", error)
  }

  return {
    status,
    isPending,
    error,
    data: destinationData?.data.destination || null,
  }
}
