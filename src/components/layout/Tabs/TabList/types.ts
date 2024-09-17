// Types
import { Props as TabItemProps } from "../TabItem/types"

export interface Props {
  children:
    | React.ReactElement<TabItemProps[]>
    | React.ReactElement<TabItemProps[]>[]
  className?: string | undefined
}
