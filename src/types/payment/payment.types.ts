// Types
import { ProductType } from "@ts/products/products.types"

export interface PaymentIntentMetadata {
  product: {
    id: number
    type: ProductType
    name: string
  }
}
