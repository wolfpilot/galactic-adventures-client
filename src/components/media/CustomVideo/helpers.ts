// Types
import { Props } from "./types"

// Utils
import { cld } from "@utils/helpers/asset.helpers"

// Setup
const { VITE_CLOUDINARY_ASSETS_PATH = "" } = import.meta.env

/**
 * Apply dynamic transforms, effects and post-processing functions.
 *
 * @see https://cloudinary.com/documentation
 */

export type GenerateVidSrcProps = Pick<Props, "path" | "format" | "quality">

export const generateVidSrc = ({
  path,
  format,
  quality,
}: GenerateVidSrcProps): string => {
  if (!path) return ""

  const vid = cld.video(`${VITE_CLOUDINARY_ASSETS_PATH}/${path}`)

  if (format) {
    vid.format(format)
  }

  if (quality) {
    vid.quality(quality)
  }

  return vid.toURL()
}
