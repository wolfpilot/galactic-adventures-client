// Types
import { Props as ImageProps } from "@components/media/CustomImage/types"
import { Props as VideoProps } from "@components/media/CustomVideo/types"

export interface MediaImageProps {
  type: "image"
  image: ImageProps
}

export interface MediaVideoProps {
  type: "video"
  video: VideoProps
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
