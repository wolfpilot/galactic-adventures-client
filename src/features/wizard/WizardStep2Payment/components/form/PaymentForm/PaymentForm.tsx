import { Elements, PaymentElement } from "@stripe/react-stripe-js"

// Types
import { Props } from "./types"

const PaymentPage = ({ stripe, options }: Props) => (
  <Elements stripe={stripe} options={options}>
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  </Elements>
)

export default PaymentPage
