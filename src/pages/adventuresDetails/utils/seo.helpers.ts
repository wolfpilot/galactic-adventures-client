// Types
import type { Props as MetadataProps } from "@components/layout/Head/types"

export const generateMetadata = ({
  name,
  metadata,
}: {
  name: string | undefined
  metadata: MetadataProps
}) => ({
  title: [name, metadata.title].filter((word) => word).join(" • "),
  description: metadata.description,
})
