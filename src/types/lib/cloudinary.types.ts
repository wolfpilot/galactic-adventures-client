/**
 * Typed from the official docs because no one thought it would be a good idea to export these.
 *
 * @see https://cloudinary.com/documentation/image_optimization#how_to_optimize_image_format
 */
export type ImageFormats =
  | "auto"
  | "avif"
  | "gif"
  | "jpeg"
  | "jxl"
  | "jxr"
  | "png"
  | "webp"

/**
 * @see https://cloudinary.com/documentation/image_optimization#automatic_quality_selection_q_auto
 */
export type ImageQualities =
  | "auto"
  | "auto:best"
  | "auto:good"
  | "auto:eco"
  | "auto:low"
