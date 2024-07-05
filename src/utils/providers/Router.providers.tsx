import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom"

// Pages
import { AdventuresPage, PaymentPage, OrderPage } from "@pages/index"

// Components
import Root from "@components/layout/Root/Root"

// Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "adventures",
        element: <AdventuresPage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
    ],
  },
])

const RouterProvider = () => <ReactRouterProvider router={router} />

export default RouterProvider
