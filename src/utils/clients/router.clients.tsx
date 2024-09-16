import { createBrowserRouter } from "react-router-dom"

// Utils
import { StripeProvider } from "@utils/providers/layout"
import { queryClient } from "@utils/clients/query.clients"
import {
  adventuresLoader,
  adventuresDetailsLoader,
  orderLoader,
} from "@utils/loaders"

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
        loader: adventuresLoader(queryClient),
      },
      {
        path: "adventures/:id",
        element: <AdventuresDetailsPage />,
        loader: adventuresDetailsLoader(queryClient),
      },
      {
        element: <StripeProvider />,
        children: [
          {
            path: "payment",
            element: <PaymentPage />,
          },
          {
            path: "order",
            element: <OrderPage />,
            loader: orderLoader(queryClient),
          },
        ],
      },
    ],
  },
])
