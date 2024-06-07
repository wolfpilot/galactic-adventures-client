import {
  type UseFormRegister,
  type FieldError,
  type ChangeHandler,
  type FieldValues,
  type ValidationRule,
  type Path,
} from "react-hook-form"

export interface Option {
  label: string
  value: string
}

export interface BaseProps<T> {
  required?: string | ValidationRule<boolean>
  name: Path<T>
  defaultValue: string
  label: string
  options: Option[]
}

export interface Props<T extends FieldValues> extends BaseProps<T> {
  register: UseFormRegister<T>
  error: FieldError | undefined
  onChange?: (data: FieldValues) => void
  onBlur?: ChangeHandler
}
