import StripeProvider from "./Stripe.providers"

/**
 * * NOTE: import/export providers that are rendered as Layout Routes from a separate file,
 * * NOTE: otherwise we get a ReferenceError: Cannot access '<X>' before initialization.
 *
 * Not entirely sure why because it doesn't look like a circular dependency issue.
 *
 * @see https://github.com/facebook/create-react-app/issues/9936
 */

export { StripeProvider }
