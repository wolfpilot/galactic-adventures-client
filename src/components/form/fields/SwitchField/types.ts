export interface Props {
  name: string
  options: [string, string]
  checked?: boolean
  className?: string | undefined
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}
