import { type FieldValues } from "react-hook-form"

// Types
import { type Props } from "./types"

// Styles
import styles from "./SelectField.module.css"

const SelectField = <T extends FieldValues>({
  required = false,
  register,
  name,
  defaultValue,
  label,
  options,
  error,
  onChange,
  onBlur,
  ...rest
}: Props<T>) => {
  if (!options?.length) return null

  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <select
        {...register(name, {
          required: required,
        })}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      >
        {options.map((option) => (
          <option key={`${name}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="error-message">{error.message}</span>}
    </div>
  )
}

export default SelectField
