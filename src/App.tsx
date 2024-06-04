import { useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { type Stripe, loadStripe } from "@stripe/stripe-js"

// Styles
import "./App.css"

// Hooks
import { usePublicKey, useClientSecret } from "@hooks/index"

// Components
import CheckoutForm from "@components/forms/CheckoutForm/CheckoutForm"

const App = () => {
  const [stripe, setStripe] = useState<Promise<Stripe | null> | null>(null)

  const publicKey = usePublicKey()
  const clientSecret = useClientSecret()

  // Hooks
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
    <>
      {isPending ? (
        <h4>Loading...</h4>
      ) : error ? (
        <h4>Oops, something went wrong</h4>
      ) : hasData ? (
        <Elements stripe={stripe} options={options}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </>
  )
}

export default App
