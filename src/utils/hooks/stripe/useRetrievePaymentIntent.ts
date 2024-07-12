import { useQuery } from "@tanstack/react-query"

// Types
import type {
  Stripe,
  PaymentIntentResult,
  StripeError,
} from "@stripe/stripe-js"

export interface Props {
  stripe: Stripe | null
  clientSecret: string | null
}

export const useRetrievePaymentIntent = ({ stripe, clientSecret }: Props) => {
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
