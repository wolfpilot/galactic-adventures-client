import React from "react"
import ReactDOM from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"

// Constants
import { metadata } from "@constants/metadata.constants"

// Utils
import { RouterProvider, QueryProvider } from "@utils/providers"

// Styles
import "@styles/index.css"

// Components
import Head from "@components/layout/Head/Head"
import { OverlayLoader } from "@components/overlays"
import { DebugGrid, DebugReactQuery } from "@components/utils"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryProvider>
        {/**
         * Rendering the HEAD before any data fetching ensures that the metadata is loaded first,
         * together with the favicons, fonts, critical CSS, etc.
         *
         * This helps avoid FOUT and other such issues.
         */}
        <Head {...metadata} />

        <OverlayLoader />

        <RouterProvider />

        <DebugGrid />
        <DebugReactQuery />
      </QueryProvider>
    </HelmetProvider>
  </React.StrictMode>
)
