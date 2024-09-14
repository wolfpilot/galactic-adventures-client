import axios from "axios"

// Types
import type { ApiResponse } from "@ts/api.types"
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
    axios.get<unknown, ApiResponse<ApiData>>(`${apiRoutes.waypoints}/${id}`),
})
