import { useState } from "react"
import {
  AdvancedImage,
  lazyload,
  accessibility,
  responsive,
  placeholder,
} from "@cloudinary/react"

// Types
import type {
  PluginLazyloadProps,
  PluginResponsiveProps,
  PluginAccessibilityProps,
  PluginPlaceholderProps,
} from "@ts/lib/cloudinary.types"
import type { Props } from "./types"

// Utils
import { cld } from "@utils/helpers/asset.helpers"
import { cleanEmpty } from "@utils/helpers/object.helpers"

// Styles
import styles from "./CustomImage.module.css"

// Setup
const { VITE_CLOUDINARY_ASSETS_PATH = "" } = import.meta.env

const defaultPluginConfig = {
  lazyload: null,
  responsive: null,
  accessibility: null,
  placeholder: {
    mode: "pixelate",
  },
}

const CustomImage = ({
  className,
  path,
  fallbackImg,
  plugins = {},
  ...rest
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const img = cld.image(`${VITE_CLOUDINARY_ASSETS_PATH}/${path}`)

  const activeImg = isError ? fallbackImg : img

  /**
   * Plugin loading order matters
   *
   * i.e. [lazyload(), responsive(), accessibility(), placeholder()])
   *
   * @see https://cloudinary.com/documentation/react_image_transformations#plugin_order
   */
  const pluginConfig = cleanEmpty({
    ...defaultPluginConfig,
    ...plugins,
  })

  const activePlugins = [
    ...(pluginConfig.lazyload
      ? [lazyload(pluginConfig.lazyload as PluginLazyloadProps)]
      : []),
    ...(pluginConfig.responsive
      ? [responsive(pluginConfig.responsive as PluginResponsiveProps)]
      : []),
    ...(pluginConfig.accessibility
      ? [accessibility(pluginConfig.accessibility as PluginAccessibilityProps)]
      : []),
    ...(pluginConfig.placeholder
      ? [placeholder(pluginConfig.placeholder as PluginPlaceholderProps)]
      : []),
  ]

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
          plugins={activePlugins}
          onLoad={handleOnLoad}
          onError={handleOnError}
          {...rest}
        />
      )}
    </div>
  )
}

export default CustomImage
