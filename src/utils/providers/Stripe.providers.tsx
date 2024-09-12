import { useState, useEffect } from "react"
import {
  type Stripe,
  type StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

// Hooks
import { usePublicKey } from "@utils/hooks/stripe"

export interface Props {
  children: React.ReactNode
}

const StripeProvider = ({ children }: Props) => {
  const [stripe, setStripe] = useState<Promise<Stripe | null> | null>(null)

  const { error, data } = usePublicKey()

  useEffect(() => {
    if (!data) return

    setStripe(loadStripe(data))
  }, [data])

  const options: StripeElementsOptions = {
    mode: "setup",
    currency: "eur",
  }

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

  return stripe ? (
    <Elements stripe={stripe} options={options}>
      {children}
    </Elements>
  ) : null
}

export default StripeProvider
