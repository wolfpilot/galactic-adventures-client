import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import {
  type Stripe,
  type StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

// Types
import { PaymentIntentState } from "@utils/stores/payment/paymentSlice"

// Utils
import { useAppBoundStore, usePaymentBoundStore } from "@utils/stores"
import { getCssVar } from "@utils/helpers/dom.helpers"
import { usePublicKey, usePaymentIntent } from "@utils/hooks/stripe"

const StripeProvider = () => {
  const updateAppIsLoading = useAppBoundStore((state) => state.updateIsLoading)
  const updatePaymentIntent = usePaymentBoundStore(
    (state) => state.updateIntent
  )

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null)

  // Fetch data
  const {
    isPending: publicKeyIsPending,
    error: publicKeyError,
    data: publicKeyData,
  } = usePublicKey()

  const {
    isPending: paymentIntentIsPending,
    error: paymentIntentError,
    data: paymentIntentData,
  } = usePaymentIntent()

  const clientSecret = paymentIntentData?.paymentIntent?.client_secret

  const isPending = publicKeyIsPending || paymentIntentIsPending
  const error = publicKeyError || paymentIntentError
  const hasData = !!(publicKeyData && paymentIntentData)

  // Hooks
  useEffect(() => {
    updateAppIsLoading(isPending)
  }, [isPending, updateAppIsLoading])

  useEffect(() => {
    if (!publicKeyData) return

    setStripePromise(loadStripe(publicKeyData))
  }, [publicKeyData])

  useEffect(() => {
    if (!paymentIntentData?.paymentIntent) return

    /**
     * Exclude the client_secret from being set as state, even though
     * for some reason it's technically public.
     *
     * @see https://github.com/stripe/react-stripe-js/issues/507
     */
    const { client_secret: _clientSecret, ...rest } =
      paymentIntentData.paymentIntent

    updatePaymentIntent({
      type: paymentIntentData.type,
      ...rest,
    } as PaymentIntentState)
  }, [paymentIntentData, updatePaymentIntent])

  if (error) {
    throw error
  }

  if (!hasData || !clientSecret || !stripePromise) return null

  /**
   * !: Do not move this config outside the component.
   *
   * Styles can only be computed during a render cycle after the document has loaded.
   */
  const elementsAppearance = {
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

  const elementsFonts = [
    {
      cssSrc:
        "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Mono&display=swap",
    },
  ]

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: elementsAppearance,
    fonts: elementsFonts,
  }

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <Outlet />
    </Elements>
  )
}

export default StripeProvider
