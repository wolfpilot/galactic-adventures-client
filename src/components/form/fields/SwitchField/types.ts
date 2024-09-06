export interface Props {
  className?: string | undefined
  name: string
  options: [string, string]
  checked?: boolean
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}
