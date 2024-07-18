/**
 * Typed from @cloudinary/html because no one thought it would be a good idea to export these.
 *
 * @see https://www.npmjs.com/package/@cloudinary/html
 */

export type PluginAccessibilityModes =
  | "darkmode"
  | "brightmode"
  | "monochrome"
  | "colorblind"

export type PluginPlaceholderModes =
  | "vectorize"
  | "pixelate"
  | "blur"
  | "predominant-color"

export interface PluginLazyloadProps {
  rootMargin?: string
  threshold?: number
}

export interface PluginResponsiveProps {
  steps?: number | number[]
}

export interface PluginAccessibilityProps {
  mode?: PluginAccessibilityModes
}

export interface PluginPlaceholderProps {
  mode?: PluginPlaceholderModes
}

export type PluginProps =
  | PluginLazyloadProps
  | PluginResponsiveProps
  | PluginAccessibilityProps
  | PluginPlaceholderProps
