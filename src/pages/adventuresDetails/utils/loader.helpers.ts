import { type QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"
import axios from "axios"

// Types
import type { ApiResponse, ApiError } from "@ts/api.types"
import type { Product } from "@ts/products/products.types"
import { ProductType } from "@ts/products/products.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

// Utils
import { urlToProductType } from "@utils/mappers"

export interface ApiData {
  product: Product
}

export interface Props {
  type: ProductType | null
  id: string | null
}

export const getProductByTypeAndIdQuery = ({ type, id }: Props) => ({
  queryKey: ["product", type, id],
  queryFn: () =>
    axios.get<unknown, ApiResponse<ApiData>, ApiError>(
      `${apiRoutes.products.index}?type=${type!}&id=${id!}`
    ),
})

export const loader =
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
        type: productType || null,
        id: idParam || null,
      })
    )
  }
