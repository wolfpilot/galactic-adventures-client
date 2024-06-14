import { PaymentElement } from "@stripe/react-stripe-js"

// Types
import { Props } from "./types"

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
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)

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
