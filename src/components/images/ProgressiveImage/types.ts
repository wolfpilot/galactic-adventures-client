// Types
import { CloudinaryImage } from "@cloudinary/url-gen/index"

export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  path: string
  className?: string | undefined
  fallbackImg?: CloudinaryImage
}
