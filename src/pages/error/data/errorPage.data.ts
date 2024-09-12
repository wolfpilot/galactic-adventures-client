// Types
import { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"

// Constants
import { breakpoints } from "@constants/layout.constants"
import { ERROR_PAGE_IMG, ERROR_PAGE_VID } from "@constants/assets.constants"

export const headerData: Omit<PageHeaderProps, "title" | "description"> = {
  media: {
    type: "video",
    video: {
      path: ERROR_PAGE_VID,
      placeholder: {
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
  },
}

export const errorPageData = {
  headerData,
}
