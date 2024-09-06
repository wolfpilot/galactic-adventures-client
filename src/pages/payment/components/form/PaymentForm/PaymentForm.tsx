import { PaymentElement } from "@stripe/react-stripe-js"

// Types
import { Props } from "./types"

// Utils
import { formatPrice } from "@utils/helpers/formatter.helpers"

// Styles
import styles from "@components/form/form.module.css"

// Components
import { SubmitButton } from "@components/buttons"

const PaymentPage = ({
  isProcessing,
  currency,
  amount,
  submitHandler,
}: Props) => {
  const formattedPrice = formatPrice({
    currency,
    amount,
  })

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.formElements}>
        <PaymentElement />
      </div>

      <SubmitButton disabled={isProcessing}>
        {isProcessing ? "Processing..." : `Pay ${formattedPrice}`}
      </SubmitButton>
    </form>
  )
}

export default PaymentPage
