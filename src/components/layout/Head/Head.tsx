import { Helmet } from "react-helmet-async"

// Types
import { Props } from "./types"

// Constants
import { metadata as defaults } from "@constants/metadata.constants"

// Setup
const { VITE_HOST_URL = "" } = import.meta.env

/**
 * *: Use forked lib react-helmet-async
 *
 * Fixes react-helmet bug where it warns about deprecated React lifecycle method.
 *
 * @see https://stackoverflow.com/questions/62202890/how-can-i-fix-using-unsafe-componentwillmount-in-strict-mode-is-not-recommended
 */
const Head = ({ title, description }: Props) => {
  const metaTitle = title ? `${title} • ${defaults.title}` : defaults.title
  const metaDescription = description || defaults.description

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Mono&display=swap"
        rel="stylesheet"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={VITE_HOST_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${VITE_HOST_URL}/og.jpg`} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content="wolfpilot-galactic-adventures-client.onrender.com"
      />
      <meta property="twitter:url" content={VITE_HOST_URL} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${VITE_HOST_URL}/og.jpg`} />
    </Helmet>
  )
}

export default Head
