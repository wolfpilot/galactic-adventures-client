import { useForm } from "react-hook-form"

// Types
import { Props, FormData } from "./types"

// Components
import SelectField from "@components/form/fields/SelectField/SelectField"

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
      <SelectField
        {...fields.destination}
        register={register}
        error={errors.destination}
        onChange={destinationChangeHandler}
      />

      <button type="submit">Continue</button>
    </form>
  )
}

export default DestinationForm
