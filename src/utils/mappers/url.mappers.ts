// Types
import { ProductType } from "@ts/products/products.types"

export const urlToProductType: Record<string, ProductType> = {
  adventures: ProductType.adventure,
  tours: ProductType.tour,
  merch: ProductType.merchandise,
}
