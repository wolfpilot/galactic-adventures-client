import { type QueryClient } from "@tanstack/react-query"
import { LoaderFunctionArgs } from "react-router-dom"

// Types
import { ProductType } from "@ts/products/products.types"

// Utils
import { getProductByTypeAndIdQuery } from "@utils/queries"

export const orderLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)

    const productTypeParam = params.get("productType") as ProductType
    const productIdParam = params.get("productId")

    return queryClient.ensureQueryData(
      getProductByTypeAndIdQuery({
        type: productTypeParam || null,
        id: productIdParam || null,
      })
    )
  }
