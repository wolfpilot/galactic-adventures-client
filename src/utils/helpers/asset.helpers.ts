// Constants
import { CLOUDINARY_TIMESTAMP_URL } from "@constants/assets.constants"

export const getCloudinaryTimestamp = (src: string) =>
  src
    // Remove any spaces such as the ones generated for srcSet
    .split(" ")[0]
    // Get the value of the timestamp
    ?.split(CLOUDINARY_TIMESTAMP_URL)[1]
