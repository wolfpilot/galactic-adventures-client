// Types
import { Props as MetadataProps } from "@components/layout/Head/types"
import { Props as WizardHeaderProps } from "@components/form/wizard/WizardHeader/types"

export interface HeaderData {
  title: string
  description: string | Record<string, string>
}

export const metadata: MetadataProps = {
  title: "Destinations",
  description: "The final step in your adventure!",
}

export const headerData: WizardHeaderProps = {
  title: "Welcome to our wonderful solar system, Sol!",
  description: "Please select a destination below.",
}

export const wizardStep1Data = {
  metadata,
  headerData,
}
