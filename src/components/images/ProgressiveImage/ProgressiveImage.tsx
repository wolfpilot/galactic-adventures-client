import { useState } from "react"
import { AdvancedImage, placeholder } from "@cloudinary/react"

// Types
import { Props } from "./types"

// Utils
import { cld } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./ProgressiveImage.module.css"

// Setup
const { VITE_CLOUDINARY_ASSETS_PATH = "" } = import.meta.env

const ProgressiveImage = ({ className, path, fallbackImg, ...rest }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const img = cld.image(`${VITE_CLOUDINARY_ASSETS_PATH}/${path}`)

  const activeImg = isError ? fallbackImg : img

  // Handlers
  const handleOnLoad = () => {
    setIsLoaded(true)
  }

  const handleOnError = () => {
    setIsError(true)
  }

  return (
    <div className={styles.wrapper}>
      {activeImg && (
        <AdvancedImage
          className={`
            ${styles.image}
            ${isLoaded && styles.image__isLoaded}
            ${className}
          `}
          cldImg={activeImg}
          plugins={[placeholder({ mode: "pixelate" })]}
          onLoad={handleOnLoad}
          onError={handleOnError}
          {...rest}
        />
      )}
    </div>
  )
}

export default ProgressiveImage
