import { type QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
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

export const getWaypointByIdQuery = ({ id }: Props) => ({
  queryKey: ["waypoint", id],
  queryFn: () =>
    axios.get<unknown, ApiResponse<ApiData>, ApiError>(
      `${apiRoutes.waypoints}/${id}`
    ),
})

export const getWaypointByIdLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)

    const waypointIdParam = params.get("waypointId")
    const waypointId = waypointIdParam || null

    return queryClient.ensureQueryData(
      getWaypointByIdQuery({
        id: waypointId,
      })
    )
  }
