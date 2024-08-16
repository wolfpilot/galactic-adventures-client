// Types
import type { Route } from "@constants/routes.constants"
import type { Props as CustomImageProps } from "@components/images/CustomImage/types"

// Constants
import { breakpoints } from "@constants/layout.constants"

export const getCtaImageProps = (route: Route): CustomImageProps | null => {
  if (!route) return null

  return {
    imgPath: `Pages/Homepage/cta-${route.url.substring(1)}.webp`,
    alt: "",
    sizes: `
      (min-width: 1440px) 400px,
      33vw
    `,
    imgSet: {
      breakpoints,
      autoScale: true,
      autoCrop: false,
    },
  }
}
