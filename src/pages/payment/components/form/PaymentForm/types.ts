export interface Props {
  isProcessing: boolean
  price: string
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void
}
