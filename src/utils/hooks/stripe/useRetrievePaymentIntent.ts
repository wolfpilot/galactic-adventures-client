import { useQuery } from "@tanstack/react-query"
import { type Stripe } from "@stripe/stripe-js"

export interface Props {
  stripe: Stripe | null
  clientSecret: string | null
}

export const useRetrievePaymentIntent = ({ stripe, clientSecret }: Props) => {
  const {
    isPending,
    error,
    data: paymentIntentData,
  } = useQuery({
    enabled: !!stripe && !!clientSecret,
    queryKey: ["paymentIntent", clientSecret],
    queryFn: () => stripe!.retrievePaymentIntent(clientSecret!),
  })

  if (error || paymentIntentData?.error) {
    console.log(
      "Could not fetch payment intent",
      error || paymentIntentData.error
    )
  }

  return {
    isPending,
    error,
    data: paymentIntentData?.paymentIntent || null,
  }
}
