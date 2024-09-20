import type { PaymentIntent, PaymentMethod } from "@stripe/stripe-js"
import type { StateCreator } from "zustand"

// Types
import type { ProductType } from "@ts/products/products.types"

// Create
export type PaymentIntentCreate = Pick<
  PaymentIntent,
  "id" | "amount" | "currency"
> & {
  type: "create"
}

// Retrieve
export interface PaymentIntentMetadataState {
  product_id: number
  product_type: ProductType
  product_name: string | null
}

export type PaymentIntentMethodState = Pick<
  PaymentMethod,
  "id" | "created" | "type" | "livemode" | "billing_details" | "ideal" | "card"
>

export type PaymentIntentRetrieve = Pick<
  PaymentIntent,
  "id" | "status" | "created" | "amount" | "currency"
> & {
  payment_method: PaymentIntentMethodState
  metadata: PaymentIntentMetadataState
} & {
  type: "retrieve"
}

export type PaymentIntentState = PaymentIntentCreate | PaymentIntentRetrieve

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
