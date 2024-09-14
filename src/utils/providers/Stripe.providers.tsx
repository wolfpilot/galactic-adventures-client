import { useState, useEffect } from "react"
import {
  type Stripe,
  type StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

// Utils
import { usePublicKey } from "@utils/hooks/stripe"
import { useAppBoundStore } from "@utils/stores"

export interface Props {
  children: React.ReactNode
}

// Setup
const stripeOptions: StripeElementsOptions = {
  mode: "setup",
  currency: "eur",
}

const StripeProvider = ({ children }: Props) => {
  const [stripe, setStripe] = useState<Promise<Stripe | null> | null>(null)

  const { error, isPending, data } = usePublicKey()

  const updateIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  // Hooks
  useEffect(() => {
    updateIsLoading(isPending)
  }, [isPending, updateIsLoading])

  useEffect(() => {
    if (!data) return

    setStripe(loadStripe(data))
  }, [data])

  /**
   * Why throw here and not in the hooks themselves?
   *
   * These hooks are generic enough that they could theoretically be used anywhere in the app,
   * perhaps where such an error would not result in a crash. This gives us a chance to handle
   * them depending on the scenario.
   */
  if (error) {
    throw error
  }

  return (
    <Elements stripe={stripe} options={stripeOptions}>
      {children}
    </Elements>
  )
}

export default StripeProvider
