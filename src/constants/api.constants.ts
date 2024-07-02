// Setup
const { VITE_SERVER_URL = "" } = import.meta.env

export const BASE_API_ROUTE = VITE_SERVER_URL

export const apiRoutes = {
  waypoints: `${VITE_SERVER_URL}/waypoints`,
  products: {
    adventures: `${VITE_SERVER_URL}/products/adventures`,
    merchandise: `${VITE_SERVER_URL}/products/merchandise`,
    tours: `${VITE_SERVER_URL}/products/tours`,
  },
  payment: `${VITE_SERVER_URL}/payment`,
}
