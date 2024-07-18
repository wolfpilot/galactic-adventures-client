// Types
import type { CloudinaryImage } from "@cloudinary/url-gen"
import type {
  PluginLazyloadProps,
  PluginAccessibilityProps,
  PluginResponsiveProps,
  PluginPlaceholderProps,
} from "@ts/lib/cloudinary.types"

export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  path: string
  className?: string | undefined
  fallbackImg?: CloudinaryImage
  plugins?: {
    lazyload?: PluginLazyloadProps
    accessibility?: PluginAccessibilityProps
    responsive?: PluginResponsiveProps
    placeholder?: PluginPlaceholderProps
  }
}
