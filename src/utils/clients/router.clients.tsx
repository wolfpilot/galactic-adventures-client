import { createBrowserRouter } from "react-router-dom"

// Pages
import {
  ErrorPage,
  HomePage,
  AdventuresPage,
  AdventuresDetailsPage,
  PaymentPage,
  OrderPage,
} from "@pages/index"

// Components
import Root from "@components/layout/Root/Root"

export const routerClient = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <Root>
        <ErrorPage />
      </Root>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "adventures",
        element: <AdventuresPage />,
      },
      {
        path: "adventures/:id",
        element: <AdventuresDetailsPage />,
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
