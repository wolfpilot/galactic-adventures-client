// Types
import { type FormFields } from "../components/form/DestinationForm/types"
import { type Destination } from "@ts/products/adventures.types"
import { type Props as MetadataProps } from "@components/layout/Head/types"

export const generateMetadata = ({
  destinationName,
  metadata,
}: {
  destinationName: string
  metadata: MetadataProps
}) => ({
  title: destinationName
    ? `${destinationName} • ${metadata.title}`
    : metadata.title,
  description: metadata.description,
})

export const generateFieldsData = ({
  data,
  activeDestinationId,
}: {
  data: Destination[]
  activeDestinationId: number | undefined
}): FormFields => {
  const options = data.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  /**
   * Check that the active ID exists in the provided data.
   *
   * This prevents situations where the user tries to access a non-existent ID
   * such as /?destinationId=999 which then becomes active on page load.
   */
  const value = data.find((item) => activeDestinationId === item.id)?.id

  return {
    destination: {
      required: "Please select a valid destination.",
      name: "destination",
      label: "Destination",
      value,
      options,
    },
  }
}

export const updateBgImage = (destinationCode: string) => {
  const parsedDestinationCode = destinationCode.toLowerCase()
  const baseBgImgPath = "/images/destinations"

  const bgImgPath = parsedDestinationCode
    ? `${baseBgImgPath}/destination-sol-${parsedDestinationCode}.jpg`
    : `${baseBgImgPath}/destination-default.jpg`

  const imgUrl = new URL(bgImgPath, import.meta.url).href

  document.documentElement.style.setProperty("--bg-url", `url(${imgUrl})`)
}
