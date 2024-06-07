import { Helmet } from "react-helmet-async"

/**
 * *: Use forked lib react-helmet-async
 *
 * Fixes react-helmet bug where it warns about deprecated React lifecycle method.
 *
 * @see https://stackoverflow.com/questions/62202890/how-can-i-fix-using-unsafe-componentwillmount-in-strict-mode-is-not-recommended
 */

const Head = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Galactic Adventures</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Space+Mono&display=swap"
      rel="stylesheet"
    />
  </Helmet>
)

export default Head
