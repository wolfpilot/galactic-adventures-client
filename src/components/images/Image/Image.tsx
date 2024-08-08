// Types
import { Props } from "./types"

// Utils
import { cld } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./Image.module.css"

// Setup
const { VITE_CLOUDINARY_ASSETS_PATH = "" } = import.meta.env

const Image = ({ className = "", path, ...rest }: Props) => {
  const img = cld.image(`${VITE_CLOUDINARY_ASSETS_PATH}/${path}`)

  const imageUrl = img.toURL()

  return (
    <div className={styles.wrapper}>
      <img className={className} src={imageUrl} alt="" {...rest} />
    </div>
  )
}

export default Image
