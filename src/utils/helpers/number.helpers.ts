// Formatters
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

// Converters
export const convertKilometresToMiles = (val: number) => {
  if (isNaN(val)) return NaN

  return val * 0.6214
}

export const convertKelvinToCelsius = (val: number) => {
  // Temp cannot go below 0K
  if (isNaN(val) || val < 0) return NaN

  return val - 273.15
}
