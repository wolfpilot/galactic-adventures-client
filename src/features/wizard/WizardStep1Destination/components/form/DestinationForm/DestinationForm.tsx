import { useForm } from "react-hook-form"

// Types
import { Props, FormData } from "./types"

// Styles
import styles from "@components/form/form.module.css"

// Components
import SelectField from "@components/form/fields/SelectField/SelectField"
import { SubmitButton } from "@components/buttons"

const DestinationForm = ({
  fields,
  destinationChangeHandler,
  submitHandler,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    values: {
      destination: fields.destination.value,
    },
    defaultValues: {
      destination: fields.destination.value,
    },
  })

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.formElements}>
        <SelectField
          {...fields.destination}
          register={register}
          error={errors.destination}
          onChange={destinationChangeHandler}
        />
      </div>

      <SubmitButton>Next Step</SubmitButton>
    </form>
  )
}

export default DestinationForm
