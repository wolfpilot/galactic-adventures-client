export const getFormattedPrice = ({
  currency,
  amount,
}: {
  currency: string
  amount: number
}) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
