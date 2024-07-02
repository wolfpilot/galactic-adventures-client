export interface Props {
  isProcessing: boolean
  currency: string
  amount: number
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void
}
