// Types
import type { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"
import type { Waypoint } from "@ts/waypoints/waypoint.types"

// Constants
import { breakpoints } from "@constants/layout.constants"

// Helpers
import { waypointCategoryToFolderName } from "@utils/mappers"

export const getPageHeaderProps = (
  data: Waypoint | null
): PageHeaderProps | null => {
  if (!data) return null

  return {
    title: data.name,
    subtitle: data.category,
    media: {
      type: "image",
      isContained: true,
      image: {
        imgPath: `${waypointCategoryToFolderName[data.category]}/${data.code}-sq.webp`,
        alt: `Featured image of ${data.category} ${data.name}.`,
        sizes: "100vw",
        imgSet: {
          breakpoints,
          autoScale: true,
          autoCrop: false,
        },
      },
    },
  }
}
