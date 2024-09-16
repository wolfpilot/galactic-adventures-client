import { PaymentElement } from "@stripe/react-stripe-js"

// Types
import { Props } from "./types"

// Styles
import styles from "@components/form/form.module.css"

// Components
import { SubmitButton } from "@components/buttons"

const PaymentPage = ({ isProcessing, submitHandler }: Props) => (
  <form onSubmit={submitHandler}>
    <div className={styles.formElements}>
      <PaymentElement />
    </div>

    <SubmitButton disabled={isProcessing}>
      {isProcessing ? "Processing..." : "Pay"}
    </SubmitButton>
  </form>
)

export default PaymentPage
