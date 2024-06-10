import { useState, useEffect } from "react"
import { type Stripe, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

// Hooks
import { usePublicKey, useClientSecret } from "./hooks"

export interface Props {
  children: React.ReactNode
}

const StripeProvider = ({ children }: Props) => {
  const [stripe, setStripe] = useState<Promise<Stripe | null> | null>(null)

  const publicKey = usePublicKey()
  const clientSecret = useClientSecret()

  useEffect(() => {
    if (!publicKey.data) return

    setStripe(loadStripe(publicKey.data))
  }, [publicKey.data])

  const isPending = publicKey.isPending || clientSecret.isPending
  const error = publicKey.error || clientSecret.error
  const hasData = !!(publicKey.data && clientSecret.data)

  const options = {
    clientSecret: clientSecret.data,
  }

  return (
    stripe &&
    clientSecret.data && (
      <Elements stripe={stripe} options={options}>
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Oops, something went wrong</p>
        ) : hasData ? (
          children
        ) : null}
      </Elements>
    )
  )
}

export default StripeProvider
