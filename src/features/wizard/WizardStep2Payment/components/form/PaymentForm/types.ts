import { type Stripe, type StripeElementsOptions } from "@stripe/stripe-js"

export interface Props {
  stripe: Promise<Stripe | null> | null
  options: StripeElementsOptions
}
