// Types
import { Props as MetadataProps } from "@components/layout/Head/types"
import { Props as WizardHeaderProps } from "@components/form/wizard/WizardHeader/types"

export const metadata: MetadataProps = {
  title: "Order Summary",
  description: "Your order details",
}

export const headerData: WizardHeaderProps = {
  title: "Order Summary",
  description: "Your order details:",
}

// TODO: Rename to destinationPageData eventually
export const wizardStep3Data = {
  metadata,
  headerData,
}
