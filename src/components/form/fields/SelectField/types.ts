import {
  type UseFormRegister,
  type FieldError,
  type FieldValues,
  type ValidationRule,
  type Path,
} from "react-hook-form"

export interface Option {
  label: string
  value: number | string
}

export interface BaseProps<T, K> {
  required?: string | ValidationRule<boolean>
  name: Path<T>
  label: string
  value: K | undefined
  options: Option[]
}

export interface Props<T extends FieldValues, K> extends BaseProps<T, K> {
  register: UseFormRegister<T>
  error: FieldError | undefined
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  onBlur?: React.FocusEventHandler<HTMLSelectElement>
}
