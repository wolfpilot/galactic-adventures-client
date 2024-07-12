import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// Types
import type { ApiResponse, ApiError } from "@ts/api.types"
import type { Waypoint } from "@ts/waypoints/waypoint.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  waypoint: Waypoint
}

export interface Props {
  id: string | null
}

export const useGetWaypointById = ({ id }: Props) => {
  const {
    isPending,
    error,
    data: res,
  } = useQuery<ApiResponse<ApiData>, ApiError>({
    queryKey: [`waypoint-${id}`],
    queryFn: () => axios.get(`${apiRoutes.waypoints}/${id}`),
  })

  if (error) {
    console.error(`Could not fetch waypoint with ID ${id}.`, error)
  }

  return {
    isPending,
    error,
    data: res?.data.data.waypoint || null,
  }
}
