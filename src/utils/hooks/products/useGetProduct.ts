import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// Types
import { ProductType } from "@ts/products/products.types"
import type { ApiResponse, ApiError } from "@ts/api.types"
import type { Product } from "@ts/products/products.types"

// Constants
import { apiRoutes } from "@constants/api.constants"

export interface ApiData {
  product: Product | null
}

export interface Props {
  type: ProductType | null
  id: string | null
}

export const useGetProduct = ({ type, id }: Props) => {
  const isEnabled = Boolean(
    id && type && Object.values(ProductType).includes(type)
  )

  const {
    isPending,
    error,
    data: res,
  } = useQuery<ApiResponse<ApiData>, ApiError>({
    enabled: isEnabled,
    queryKey: ["product", type, id],
    // This fn only gets called if the initial check passes,
    // therefore we can safely assert that the params are not null.
    queryFn: () =>
      axios.get(`${apiRoutes.products.index}?type=${type!}&id=${id!}`),
  })

  if (error) {
    console.error("Could not fetch product", error)
  }

  return {
    isPending,
    error,
    data: res?.data.data.product || null,
  }
}
