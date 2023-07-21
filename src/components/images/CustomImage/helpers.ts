import { pixelate } from "@cloudinary/url-gen/actions/effect"
import { crop, scale } from "@cloudinary/url-gen/actions/resize"

// Types
import { ImageFormats, ImageQualities } from "@ts/lib/cloudinary.types"

// Utils
import { cld } from "@utils/helpers/asset.helpers"

// Setup
const { VITE_CLOUDINARY_ASSETS_PATH = "" } = import.meta.env

/**
 * Apply dynamic transforms, effects and post-processing functions.
 *
 * @see https://cloudinary.com/documentation
 */
export const generateImgSrc = ({
  imgPath,
  isPlaceholderLoaded,
  format,
  quality,
}: {
  imgPath: string
  isPlaceholderLoaded: boolean
  format: ImageFormats
  quality: ImageQualities | number
}): string => {
  if (!imgPath) return ""

  const img = cld.image(`${VITE_CLOUDINARY_ASSETS_PATH}/${imgPath}`)

  if (!isPlaceholderLoaded) {
    img.effect(pixelate())
  }

  img.format(format).quality(quality)

  return img.toURL()
}

export const generateImgSrcSet = ({
  imgPath,
  srcSetBreakpoints,
  srcSetScale,
  srcSetCrop,
  isPlaceholderLoaded,
  format,
  quality,
}: {
  imgPath: string
  srcSetBreakpoints: number[]
  srcSetScale: boolean
  srcSetCrop: boolean
  isPlaceholderLoaded: boolean
  format: ImageFormats
  quality: ImageQualities | number
}): string => {
  if (!srcSetBreakpoints.length) return ""

  return srcSetBreakpoints
    .map((breakpoint) => {
      const img = cld.image(`${VITE_CLOUDINARY_ASSETS_PATH}/${imgPath}`)

      if (srcSetScale) {
        img.resize(scale(breakpoint))
      }

      if (srcSetCrop) {
        // Crop horizontally, keeping the initial height
        img.resize(crop().width(breakpoint).height("ih"))
      }

      if (!isPlaceholderLoaded) {
        img.effect(pixelate())
      }

      img.format(format).quality(quality)

      return `${img.toURL()} ${breakpoint}w`
    })
    .join(",")
}
