import { useState } from "react"

// Types
import { Props } from "./types"

// Utils
import { generateVidSrc } from "./helpers"

// Styles
import styles from "./CustomVideo.module.css"

// Components
import { CustomImage } from "@components/images"

const CustomVideo = ({
  className = "",
  path,
  placeholder,
  format = "mp4",
  quality = 70,
  ...rest
}: Props) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const handleOnLoad = () => {
    console.log("LOAD")

    setIsVideoLoaded(true)
  }

  // Generate video properties
  const src = generateVidSrc({
    path: path,
    format,
    quality,
  })

  if (!src) return null

  return (
    <div
      className={`
        ${styles.wrapper}
        ${className}
      `}
    >
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        {...rest}
        onLoadedData={handleOnLoad}
      >
        <source src={src} type={`video/${format}`} />
        Your browser does not support the video tag.
      </video>

      <CustomImage
        className={`
          ${styles.placeholder}
          ${isVideoLoaded ? styles.placeholder__isHidden : ""}
        `}
        {...placeholder}
      />
    </div>
  )
}

export default CustomVideo
