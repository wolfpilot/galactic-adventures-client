import { useQuery } from "@tanstack/react-query"
import { useStripe } from "@stripe/react-stripe-js"

// Types
import type { PaymentIntentResult, StripeError } from "@stripe/stripe-js"

export interface Props {
  clientSecret: string | null
}

export const useRetrievePaymentIntent = ({ clientSecret }: Props) => {
  const stripe = useStripe()

  const isEnabled = Boolean(stripe && clientSecret)

  const {
    isPending,
    error,
    data: res,
  } = useQuery<PaymentIntentResult, StripeError>({
    enabled: isEnabled,
    queryKey: ["paymentIntent", clientSecret],
    // This fn only gets called if the initial check passes,
    // therefore we can safely assert that the params are not null.
    queryFn: () => stripe!.retrievePaymentIntent(clientSecret!),
  })

  if (error) {
    console.error("Could not fetch payment intent", error)
  }

  return {
    isPending,
    error,
    data: res?.paymentIntent || null,
  }
}
