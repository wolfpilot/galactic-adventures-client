import { type StateCreator } from "zustand"

export interface PaymentState {
  amount: number | undefined
  currency: string | undefined
}

export interface PaymentSlice extends PaymentState {
  updateDetails: (val: PaymentState) => void
}

// Setup
const initialState: PaymentState = {
  amount: undefined,
  currency: undefined,
}

export const createPaymentSlice: StateCreator<
  PaymentSlice,
  [],
  [],
  PaymentSlice
> = (set) => ({
  ...initialState,
  updateDetails: (val) => set(() => ({ ...val })),
})
