// Types
import { Props as MetadataProps } from "@components/layout/Head/types"
import { Props as PageHeaderProps } from "@components/layout/Page/PageHeader/types"

export const metadata: MetadataProps = {
  title: "Order",
  description: "Overview",
}

export const headerData: PageHeaderProps = {
  title: "Order",
  description: "Overview",
}

export const getHeaderData = (orderId: string): PageHeaderProps => ({
  ...headerData,
  ...(orderId && { description: `#${orderId}` }),
})

export const pageData = {
  metadata,
  headerData,
  getHeaderData,
}
