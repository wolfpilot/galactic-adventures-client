// Types
import { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"

// Constants
import { breakpoints } from "@constants/layout.constants"
import { ERROR_PAGE_IMG } from "@constants/assets.constants"

export const defaultError = {
  title: "Oops!",
  description: "Something went wrong...",
}

export const headerData: Omit<PageHeaderProps, "title" | "description"> = {
  media: {
    type: "image",
    image: {
      imgPath: ERROR_PAGE_IMG,
      alt: `Image of a black hole.`,
      sizes: "100vw",
      imgSet: {
        breakpoints,
        autoScale: false,
        autoCrop: true,
      },
    },
  },
}

export const errorPageData = {
  defaultError,
  headerData,
}
