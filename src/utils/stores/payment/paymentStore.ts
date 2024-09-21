import { create } from "zustand"
import { devtools } from "zustand/middleware"

// Types
import {
  type PaymentSlice,
  createPaymentSlice,
} from "@utils/stores/payment/paymentSlice"

export type StoreState = PaymentSlice

export const usePaymentBoundStore = create<StoreState>()(
  devtools((...args) => ({
    ...createPaymentSlice(...args),
  }))
)
