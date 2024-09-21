import axios from "axios"

// Types
import type { ApiResponse } from "@ts/api.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

/**
 * Check if server is alive and kicking
 */
export const pingServer = () =>
  axios
    .get<unknown, ApiResponse<{ ok: boolean }>>(apiRoutes.ping)
    .then((res) => res.data)
