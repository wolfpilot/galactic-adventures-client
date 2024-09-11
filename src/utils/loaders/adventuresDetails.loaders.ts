import { type QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"

// Utils
import { urlToProductType } from "@utils/mappers"
import { getProductByTypeAndIdQuery } from "@utils/queries"

export const adventuresDetailsLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    const idParam = params.id

    // Extract the URL segment to be mapped to a ProductType
    const url = new URL(request.url)
    const baseUrl = url.pathname.split("/").filter((_) => _)[0] || ""

    /**
     * We can guarantee that the resulting URL segment is a ProductType
     * because we're only calling this loader on specified routes.
     */
    const productType = urlToProductType[baseUrl]

    return queryClient.ensureQueryData(
      getProductByTypeAndIdQuery({
        type: productType ?? null,
        id: idParam ?? null,
      })
    )
  }
