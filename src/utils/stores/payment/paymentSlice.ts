import type { PaymentIntent, PaymentMethod } from "@stripe/stripe-js"
import type { StateCreator } from "zustand"

// Types
import type { ProductType } from "@ts/products/products.types"

export interface PaymentIntentMetadataState {
  productId: number
  productType: ProductType
  productName: string
}

export type PaymentIntentState = Partial<{
  id: PaymentIntent["id"]
  status: PaymentIntent["status"]
  created: PaymentIntent["created"]
  amount: PaymentIntent["amount"]
  currency: PaymentIntent["currency"]
  payment_method: PaymentMethod
  metadata: PaymentIntentMetadataState
}>

export interface PaymentState {
  intent: PaymentIntentState | undefined
}

export interface PaymentSlice extends PaymentState {
  updateIntent: (val: PaymentIntentState) => void
}

// Setup
const initialState: PaymentState = {
  intent: undefined,
}

export const createPaymentSlice: StateCreator<
  PaymentSlice,
  [],
  [],
  PaymentSlice
> = (set) => ({
  ...initialState,
  updateIntent: (val) =>
    set(() => ({
      intent: {
        ...val,
      },
    })),
})
