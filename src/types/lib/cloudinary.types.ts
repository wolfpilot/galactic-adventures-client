/**
 * @see https://cloudinary.com/documentation/image_optimization#automatic_quality_selection_q_auto
 * @see https://cloudinary.com/documentation/video_optimization#automatic_quality_q_auto
 */
export type MediaQualities =
  | "auto"
  | "auto:best"
  | "auto:good"
  | "auto:eco"
  | "auto:low"

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
 * Typed from the official docs because no one thought it would be a good idea to export these.
 *
 * @see https://cloudinary.com/documentation/image_optimization#how_to_optimize_image_format
 */
export type VideoFormats = "auto" | "avi" | "mov" | "mkv" | "mp4" | "webm"
