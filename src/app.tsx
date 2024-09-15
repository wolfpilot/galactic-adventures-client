import React from "react"
import ReactDOM from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"

// Constants
import { metadata } from "@constants/metadata.constants"

// Utils
import {
  RouterProvider,
  QueryProvider,
  StripeProvider,
} from "@utils/providers/"

// Components
import Head from "@components/layout/Head/Head"
import { OverlayLoader } from "@components/overlays"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OverlayLoader />

    <HelmetProvider>
      {/**
       * Rendering the HEAD before any data fetching ensures that the metadata is loaded first,
       * together with the favicons, fonts, critical CSS, etc.
       *
       * This helps avoid FOUT and other such issues.
       */}
      <Head {...metadata} />

      <QueryProvider>
        <StripeProvider>
          <RouterProvider />
        </StripeProvider>
      </QueryProvider>
    </HelmetProvider>
  </React.StrictMode>
)
