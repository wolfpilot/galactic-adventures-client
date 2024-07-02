import { type SubmitHandler } from "react-hook-form"

// Types
import { type BaseProps as SelectFieldBaseProps } from "@components/form/fields/SelectField/types"

export interface FormData {
  destination: number | undefined
}

export interface FormFields {
  destination: SelectFieldBaseProps<FormData, number>
}

export interface Props {
  fields: FormFields
  destinationChangeHandler: React.ChangeEventHandler<HTMLSelectElement>
  submitHandler: SubmitHandler<FormData>
}
