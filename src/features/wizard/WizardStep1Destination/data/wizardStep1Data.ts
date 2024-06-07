// Types
import { type BaseProps as SelectFieldBaseProps } from "@components/form/fields/SelectField/types"
import { FormData } from "../components/form/DestinationForm/types"

export const headerData = {
  title: "Welcome to our wonderful solar system, Sol!",
  description: "Please select a destination below.",
}

export const destinationFieldData: SelectFieldBaseProps<FormData> = {
  required: "Please select a valid destination.",
  name: "destination",
  label: "Destination",
  defaultValue: "mars",
  options: [
    {
      label: "Moon",
      value: "moon",
    },
    {
      label: "Mercury",
      value: "mercury",
    },
    {
      label: "Venus",
      value: "venus",
    },
    {
      label: "Earth",
      value: "earth",
    },
    {
      label: "Mars",
      value: "mars",
    },
    {
      label: "Jupiter",
      value: "jupiter",
    },
    {
      label: "Saturn",
      value: "saturn",
    },
    {
      label: "Uranus",
      value: "uranus",
    },
    {
      label: "Neptune",
      value: "neptune",
    },
    {
      label: "Pluto",
      value: "pluto",
    },
  ],
}

export const formData = {
  fields: {
    destination: destinationFieldData,
  },
}

export const wizardStep1Data = {
  headerData,
  formData,
}
