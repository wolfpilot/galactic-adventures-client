import { type QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"

// Utils
import { getWaypointByIdQuery } from "@utils/queries"

export const adventuresLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)

    const waypointIdParam = params.get("waypointId")

    return queryClient.ensureQueryData(
      getWaypointByIdQuery({
        id: waypointIdParam ?? null,
      })
    )
  }
