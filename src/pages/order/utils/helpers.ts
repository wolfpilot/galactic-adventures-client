import { PaymentIntent } from "@stripe/stripe-js"

export const getOrderStatusText = (
  status: PaymentIntent.Status | undefined
): string => {
  switch (status) {
    case "canceled":
      return "Payment has been cancelled."
    case "succeeded":
      return "Payment successful!"
    case "processing":
      return "Payment is processing."
    default:
      return "Payment failed, please try again."
  }
}
