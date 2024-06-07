import { type FieldValues } from "react-hook-form"

// Types
import { type BaseProps as SelectFieldBaseProps } from "@components/form/fields/SelectField/types"

export interface FormData {
  destination: string
}

export interface Props {
  fields: {
    destination: SelectFieldBaseProps<FormData>
  }
  destinationChangeHandler: (e: FieldValues) => void
  submitHandler: (data: FieldValues) => void
}
