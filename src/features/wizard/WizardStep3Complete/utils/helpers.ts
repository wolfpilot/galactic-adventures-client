import { PaymentIntent } from "@stripe/stripe-js"

export const getOrderStatusText = (
  status: PaymentIntent.Status | undefined
): string => {
  switch (status) {
    case "succeeded":
      return "Payment successful!"
    case "processing":
      return "Payment is processing, please try again later."
    case "requires_payment_method":
      return "Payment failed, please try again."
    default:
      return "Something went wrong."
  }
}
