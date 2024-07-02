// Types
import { Props as MetadataProps } from "@components/layout/Head/types"
import { Props as WizardHeaderProps } from "@components/form/wizard/WizardHeader/types"

export const metadata: MetadataProps = {
  title: "Payment",
  description: "Checkout",
}

export const headerData: WizardHeaderProps = {
  title: "Payment",
  description: "Thank you! Your *donation* is greatly appreciated.",
}

export const wizardStep2Data = {
  metadata,
  headerData,
}
