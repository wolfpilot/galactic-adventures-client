// Types
import { ImageFormats, ImageQualities } from "@ts/lib/cloudinary.types"

export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  imgPath: string
  fallbackImgPath?: string
  srcSetBreakpoints?: number[]
  srcSetScale?: boolean
  srcSetCrop?: boolean
  format?: ImageFormats
  quality?: ImageQualities | number
  className?: string | undefined
}
