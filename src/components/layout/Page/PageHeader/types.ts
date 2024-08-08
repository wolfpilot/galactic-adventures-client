// Types
import { Props as ImageProps } from "@components/images/CustomImage/types"

export interface MediaImageProps {
  type: "image"
  image: ImageProps
}

export interface MediaVideoProps {
  type: "video"
  // video: TBA
}

export interface Props {
  className?: string
  title: string
  subtitle?: string
  description?: string
  media?: {
    isContained?: boolean
  } & (MediaImageProps | MediaVideoProps)
}
