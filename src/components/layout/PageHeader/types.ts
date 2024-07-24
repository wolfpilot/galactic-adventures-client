// Types
import { Props as ImageProps } from "@components/images/CustomImage/types"

export interface Props {
  title: string
  subtitle?: string
  description?: string
  media?: {
    type: "image"
    image: Pick<ImageProps, "imgPath" | "alt">
  }
}
