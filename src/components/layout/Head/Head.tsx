import { Helmet } from "react-helmet-async"

// Types
import { Props } from "./types"

// Constants
import { metadata as defaults } from "@constants/metadata.constants"

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
      <title>{metaTitle}</title>
      <meta charSet="utf-8" />
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
    </Helmet>
  )
}

export default Head
