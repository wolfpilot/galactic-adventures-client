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

  const { isPending, error, data } = usePublicKey()

  useEffect(() => {
    if (!data) return

    setStripe(loadStripe(data))
  }, [data])

  const options: StripeElementsOptions = {
    mode: "setup",
    currency: "eur",
  }

  return (
    <>
      {error && <p>Oops, something went wrong</p>}

      {isPending && <p>Loading...</p>}

      {stripe && (
        <Elements stripe={stripe} options={options}>
          {children}
        </Elements>
      )}
    </>
  )
}

export default StripeProvider
