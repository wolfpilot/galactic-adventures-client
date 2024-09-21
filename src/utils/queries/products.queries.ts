import axios from "axios"

// Types
import type { ApiResponse } from "@ts/api.types"
import { type Product, ProductType } from "@ts/products/products.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

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
    axios
      .get<
        unknown,
        ApiResponse<ApiData>
      >(`${apiRoutes.products.index}?type=${type}&id=${id}`)
      .then((res) => res.data.data),
})
