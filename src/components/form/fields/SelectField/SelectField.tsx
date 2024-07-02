import { type FieldValues } from "react-hook-form"

// Types
import { type Props } from "./types"

// Styles
import styles from "./SelectField.module.css"

const SelectField = <
  T extends FieldValues,
  K extends string | number | readonly string[] | undefined,
>({
  required = false,
  register,
  name,
  label,
  value,
  options,
  error,
  onChange,
  onBlur,
  ...rest
}: Props<T, K>) => {
  if (!options?.length) return null

  return (
    <>
      <div className={styles.fieldWrapper}>
        <label>{label}</label>
        <select
          {...register(name, {
            required: required,
          })}
          name={name}
          defaultValue={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        >
          <option value="" disabled>
            Please select...
          </option>

          {options.map((option) => (
            <option key={`${name}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error-message">{error.message}</p>}
    </>
  )
}

export default SelectField
