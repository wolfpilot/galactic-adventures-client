export enum RouteNames {
  Home = "home",
  Adventures = "adventures",
  Tours = "tours",
  Merch = "merch",
  Payment = "payment",
  Order = "order",
}

export interface Route {
  label: string
  url: string
}

export type Routes = Record<RouteNames, Route>

// Setup
const { VITE_CLIENT_URL = "" } = import.meta.env

export const BASE_ROUTE = VITE_CLIENT_URL

export const routes: Routes = {
  home: {
    label: "Home",
    url: "/",
  },
  adventures: {
    label: "Adventures",
    url: "/adventures",
  },
  tours: {
    label: "Tours",
    url: "/tours",
  },
  merch: {
    label: "Merchandise",
    url: "/merch",
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

export const navRoutes = [routes.adventures, routes.tours, routes.merch]
