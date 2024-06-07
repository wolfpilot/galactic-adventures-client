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
  } = useForm<FormData>()

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <SelectField
        {...fields.destination}
        register={register}
        error={errors.destination}
        onChange={destinationChangeHandler}
      />

      <input type="submit" />
    </form>
  )
}

export default DestinationForm
