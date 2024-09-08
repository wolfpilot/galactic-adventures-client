// Types
import { VideoFormats, MediaQualities } from "@ts/lib/cloudinary.types"
import { Props as ImageProps } from "@components/images/CustomImage/types"

export interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
  placeholder: ImageProps
  path: string
  format?: VideoFormats
  quality?: MediaQualities | number
  className?: string | undefined
}
