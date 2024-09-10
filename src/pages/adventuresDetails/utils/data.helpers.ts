// Types
import type { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"
import type { Adventure } from "@ts/products/adventures.types"

// Constants
import { breakpoints } from "@constants/layout.constants"

// Helpers
import { waypointCategoryToFolderName } from "@utils/mappers"

export const getPageHeaderProps = (
  data: Adventure | null
): PageHeaderProps | null => {
  if (!data?.waypoint) return null

  return {
    title: data.waypoint.name,
    subtitle: data.waypoint.category,
    description: data.description,
    media: {
      type: "image",
      image: {
        imgPath: `${waypointCategoryToFolderName[data.waypoint.category]}/${data.waypoint.code}.webp`,
        alt: `Featured image of ${data.waypoint.category} ${data.waypoint.name}.`,
        sizes: "100vw",
        imgSet: {
          breakpoints,
          autoScale: false,
          autoCrop: true,
        },
      },
    },
  }
}
