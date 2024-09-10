import { pixelate } from "@cloudinary/url-gen/actions/effect"
import { crop, scale } from "@cloudinary/url-gen/actions/resize"

// Types
import { Props } from "./types"

// Utils
import { cloudinaryClient as cld } from "@utils/clients"

// Setup
const { VITE_CLOUDINARY_ASSETS_PATH = "" } = import.meta.env

/**
 * Apply dynamic transforms, effects and post-processing functions.
 *
 * @see https://cloudinary.com/documentation
 */

export type GenerateImgSrcProps = Pick<
  Props,
  "imgPath" | "transforms" | "format" | "quality"
> & {
  isPlaceholderLoaded: boolean
}

export type GenerateImgSrcSetProps = Pick<
  Props,
  "imgPath" | "imgSet" | "format" | "quality"
> & {
  isPlaceholderLoaded: boolean
}

export const generateImgSrc = ({
  imgPath,
  isPlaceholderLoaded,
  transforms,
  format,
  quality,
}: GenerateImgSrcProps): string => {
  if (!imgPath) return ""

  const img = cld.image(`${VITE_CLOUDINARY_ASSETS_PATH}/${imgPath}`)

  if (!isPlaceholderLoaded) {
    img.effect(pixelate())
  }

  if (transforms?.scale) {
    img.resize(scale(transforms.scale.width, transforms.scale.height))
  }

  if (transforms?.crop) {
    img.resize(crop(transforms.crop.width, transforms.crop.height))
  }

  if (format) {
    img.format(format)
  }

  if (quality) {
    img.quality(quality)
  }

  return img.toURL()
}

export const generateImgSrcSet = ({
  imgSet,
  ...rest
}: GenerateImgSrcSetProps): string => {
  if (!imgSet?.breakpoints.length) return ""

  return imgSet.breakpoints
    .map((breakpoint) => {
      const transforms = {
        ...(imgSet.autoScale && {
          scale: {
            width: breakpoint,
          },
        }),
        ...(imgSet.autoCrop && {
          crop: {
            width: breakpoint,
            height: "ih",
          },
        }),
      }

      const imgUrl = generateImgSrc({
        ...rest,
        transforms,
      })

      return `${imgUrl} ${breakpoint}w`
    })
    .join(",")
}
