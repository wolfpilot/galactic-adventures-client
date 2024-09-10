import { createBrowserRouter } from "react-router-dom"

// Utils
import { queryClient } from "@utils/clients/query.clients"
import { loader as adventuresLoader } from "@pages/adventures/utils/loader.helpers"
import { loader as adventuresDetailsLoader } from "@pages/adventuresDetails/utils/loader.helpers"

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
