import { useState, useEffect } from "react"
import { Outlet, useSearchParams } from "react-router-dom"
import { type Stripe, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

// Types
import { ProductType } from "@ts/products/products.types"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { usePublicKey, useClientSecret } from "@utils/hooks/stripe"

const StripeProvider = () => {
  const updateAppIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const [searchParams] = useSearchParams()
  const productTypeParam = searchParams.get("productType") as ProductType
  const productIdParam = searchParams.get("productId")

  const productType = productTypeParam ?? null
  const productId = productIdParam ?? null

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null)

  const {
    isPending: publicKeyIsPending,
    error: publicKeyError,
    data: publicKeyData,
  } = usePublicKey()

  const {
    isPending: clientSecretIsPending,
    error: clientSecretError,
    data: clientSecretData,
  } = useClientSecret({
    productType,
    productId,
  })

  const isPending = publicKeyIsPending || clientSecretIsPending
  const error = publicKeyError || clientSecretError
  const hasData = !!(publicKeyData && clientSecretData)

  // Hooks
  useEffect(() => {
    updateAppIsLoading(isPending)
  }, [isPending, updateAppIsLoading])

  useEffect(() => {
    if (!publicKeyData) return

    setStripePromise(loadStripe(publicKeyData))
  }, [publicKeyData])

  if (error) {
    throw error
  }

  return (
    <>
      {hasData && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecretData,
          }}
        >
          <Outlet />
        </Elements>
      )}
    </>
  )
}

export default StripeProvider
