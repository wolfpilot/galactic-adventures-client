import { useState } from "react"

// Types
import { Props } from "./types"

// Utils
import { generateImgSrc, generateImgSrcSet } from "./helpers"

// Styles
import styles from "./CustomImage.module.css"

/**
 * TL;DR: Made my own image consumer.
 *
 * One might wonder, why not just use Cloudinary's own React library? Quite honestly, because it sucks.
 * Cloudinary exports the AdvancedImage React component which comes with quite a few drawbacks, namely:
 *
 * 1. It doesn't support the native "srcset" HTML attribute.
 *
 * Even though technically any additional props can be passed and spread, passing "srcset" breaks plugins
 * such as the Placeholder with its pixelation effect. Not only that, but "src" is set dynamically regardless
 * of "srcset", which triggers both image downloads at the same time.
 *
 * @see https://github.com/cloudinary/frontend-frameworks/blob/master/packages/html/src/layers/htmlImageLayer.ts#L41
 *
 * 2. It implements responsiveness via JS logic.
 *
 * It's not clear why this is even necessary, however having a new event listener for every single responsive image
 * where each of them is debounced by 100ms is clearly not scalable for performance.
 *
 * @see https://github.com/cloudinary/frontend-frameworks/blob/master/packages/html/src/plugins/responsive.ts#L61
 *
 * 3. It's programmed following OOP practices where objects are mutated on each transform.
 *
 * This has caused numerous headaches where passing a CloudinaryImage object as a prop and reusing it for both
 * placeholder and image applies the same transforms multiple times because under the hood they all mutate the
 * same object.
 *
 * @see https://github.com/cloudinary/frontend-frameworks/blob/master/packages/html/src/plugins/placeholder.ts#L44
 *
 */
const CustomImage = ({
  className = "",
  imgPath,
  fallbackImgPath,
  transforms,
  imgSet,
  sizes = "100vw",
  format = "webp",
  quality = 70,
  ...rest
}: Props) => {
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const activeImgPath = isError ? fallbackImgPath : imgPath

  if (!activeImgPath) return null

  // Handlers
  const handleOnLoad = () => {
    if (isPlaceholderLoaded) return

    setIsPlaceholderLoaded(true)
  }

  const handleOnError = () => {
    setIsError(true)
  }

  // Generate image properties
  const src = generateImgSrc({
    imgPath: activeImgPath,
    isPlaceholderLoaded,
    transforms,
    format,
    quality,
  })
  const srcSet = generateImgSrcSet({
    imgPath: activeImgPath,
    imgSet,
    isPlaceholderLoaded,
    format,
    quality,
  })

  if (!src) return null

  return (
    <picture
      className={`
        ${styles.wrapper}
        ${className}
      `}
      onLoad={handleOnLoad}
      onError={handleOnError}
    >
      {srcSet && <source sizes={sizes} srcSet={srcSet} />}
      <img
        className={`
          ${styles.image}
          ${isPlaceholderLoaded ? styles.image__isPlaceholderLoaded : ""}
        `}
        src={src}
        {...rest}
      />
    </picture>
  )
}

export default CustomImage
