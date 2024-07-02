import React from "react"
import ReactDOM from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"

// Utils
import {
  RouterProvider,
  QueryProvider,
  StripeProvider,
} from "@utils/providers/"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <StripeProvider>
        <HelmetProvider>
          <RouterProvider />
        </HelmetProvider>
      </StripeProvider>
    </QueryProvider>
  </React.StrictMode>
)
