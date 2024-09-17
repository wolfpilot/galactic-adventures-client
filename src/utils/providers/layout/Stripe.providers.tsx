import { useState, useEffect } from "react"
import { Outlet, useSearchParams } from "react-router-dom"
import { type Stripe, type Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

// Types
import { ProductType } from "@ts/products/products.types"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { usePublicKey, useClientSecret } from "@utils/hooks/stripe"
import { getCssVar } from "@utils/helpers/dom.helpers"

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

  if (!hasData || !stripePromise) return null

  /**
   * !: Do not move this config outside the component.
   *
   * Styles can only be computed during a render cycle after the document has loaded.
   */
  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      gridRowSpacing: getCssVar("--spacing-default"),
      gridColumnSpacing: getCssVar("--spacing-default"),
      tabSpacing: getCssVar("--spacing-small"),
      fontFamily: getCssVar("--font-family-primary"),
      fontSizeBase: getCssVar("--text-default-font-size"),
      fontLineHeight: getCssVar("--text-default-line-height"),
      borderRadius: getCssVar("--border-radius-default"),
      colorBackground: getCssVar("--c-dGrey"),
      colorPrimary: getCssVar("--c-accent1"),
      accessibleColorOnColorPrimary: getCssVar("--c-white"),
      colorText: getCssVar("--c-white"),
      colorTextSecondary: getCssVar("--c-grey"),
      colorTextPlaceholder: getCssVar("--c-grey"),
      tabIconColor: getCssVar("--c-grey"),
      logoColor: "dark",
    },
    rules: {
      ".Label": {
        color: getCssVar("--c-grey"),
        fontFamily: getCssVar("--font-family-secondary"),
        fontSize: getCssVar("--copy-m-font-size"),
        textTransform: "uppercase",
      },
    },
  }

  const stripeOptions = {
    clientSecret: clientSecretData,
    appearance,
  }

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <Outlet />
    </Elements>
  )
}

export default StripeProvider
