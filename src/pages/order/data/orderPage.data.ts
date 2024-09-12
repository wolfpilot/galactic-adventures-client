// Types
import { Props as MetadataProps } from "@components/layout/Head/types"
import { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"

export const metadata: MetadataProps = {
  title: "Order Summary",
  description: "Your order details",
}

export const getHeaderProps = (isPending: boolean): PageHeaderProps => ({
  title: "Order Summary",
  description: isPending ? "Loading..." : "Your order details:",
})

export const pageData = {
  metadata,
  getHeaderProps,
}
