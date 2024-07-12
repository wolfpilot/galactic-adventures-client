// Setup
const { VITE_CLIENT_URL = "" } = import.meta.env

export const BASE_ROUTE = VITE_CLIENT_URL

export const routes = {
  home: {
    label: "Home",
    url: "/",
  },
  adventures: {
    label: "Adventures",
    url: "/adventures",
  },
  payment: {
    label: "Payment",
    url: "/payment",
  },
  order: {
    label: "Order",
    url: "/order",
  },
}
