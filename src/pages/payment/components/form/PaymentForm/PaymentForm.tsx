import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js"

// Types
import { Props } from "./types"

// Styles
import styles from "./PaymentForm.module.css"

// Components
import { SubmitButton } from "@components/buttons"

const PaymentPage = ({ isProcessing, price, submitHandler }: Props) => (
  <form onSubmit={submitHandler}>
    <div className={styles.elementsWrapper}>
      <div className={styles.element}>
        <LinkAuthenticationElement />
      </div>

      <div className={styles.element}>
        <PaymentElement />
      </div>
    </div>

    <SubmitButton disabled={isProcessing}>
      {isProcessing ? "Processing..." : `Pay ${price}`}
    </SubmitButton>
  </form>
)

export default PaymentPage
