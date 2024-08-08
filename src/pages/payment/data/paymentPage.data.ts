// Types
import { Props as MetadataProps } from "@components/layout/Head/types"
import { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"

export const metadata: MetadataProps = {
  title: "Payment",
  description: "Checkout",
}

export const headerData: PageHeaderProps = {
  title: "Payment",
  description: "Thank you! Your *donation* is greatly appreciated.",
}

export const pageData = {
  metadata,
  headerData,
}
