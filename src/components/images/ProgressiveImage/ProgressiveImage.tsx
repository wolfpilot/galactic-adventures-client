import { useState } from "react"
import { Resize } from "@cloudinary/url-gen/actions/resize"

// Types
import { Props } from "./types"

// Utils
import { cld } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./ProgressiveImage.module.css"

// Setup
const { VITE_CLOUDINARY_ASSETS_PATH = "" } = import.meta.env

const ProgressiveImage = ({
  className,
  path,
  placeholderSizePx = 16,
  ...rest
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const img = cld.image(`${VITE_CLOUDINARY_ASSETS_PATH}/${path}`)

  const imageUrl = img.toURL()
  const placeholderUrl = img
    .resize(Resize.scale().width(placeholderSizePx).height(placeholderSizePx))
    .toURL()

  return (
    <div className={styles.wrapper}>
      <img
        className={`
          ${styles.placeholder}
          ${isImageLoaded && styles.placeholder__isLoaded}
          ${className}
        `}
        src={placeholderUrl}
        {...rest}
      />

      <img
        className={`
          ${styles.image}
          ${isImageLoaded && styles.image__isLoaded}
          ${className}
        `}
        src={imageUrl}
        alt=""
        onLoad={() => setIsImageLoaded(true)}
        {...rest}
      />
    </div>
  )
}

export default ProgressiveImage
