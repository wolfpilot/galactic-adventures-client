export interface Props {
  title: string
  text: string
  isClosed: boolean
  className?: string | undefined
  onCloseHandler: () => void
}
