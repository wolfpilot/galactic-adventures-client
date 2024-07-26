// Types
import { ImageFormats, ImageQualities } from "@ts/lib/cloudinary.types"

export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  imgPath: string
  fallbackImgPath?: string
  transforms?:
    | {
        scale?: {
          width?: number | string
          height?: number | string
        }
        crop?: {
          width?: number | string
          height?: number | string
        }
      }
    | undefined
  imgSet?:
    | {
        breakpoints: number[]
        autoScale?: boolean
        autoCrop?: boolean
      }
    | undefined
  format?: ImageFormats
  quality?: ImageQualities | number
  className?: string | undefined
}
