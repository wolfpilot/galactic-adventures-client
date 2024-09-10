import { useParams, useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

// Types
import { ProductType } from "@ts/products/products.types"

// Data
import { adventuresDetailsPageData as pageData } from "./data/adventuresDetailsPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Helpers
import {
  getProductByTypeAndIdLoader as loader,
  getProductByTypeAndIdQuery as query,
} from "@utils/loaders"
import { generateMetadata } from "./utils/seo.helpers"
import { getPageHeaderProps } from "./utils/data.helpers"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageCta } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"

const AdventuresDetailsPage = () => {
  const { id } = useParams()

  const productId = id ?? null

  // Fetch cached or new data
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >

  const { data: adventuresDetailsData } = useQuery({
    ...query({
      type: ProductType.adventure,
      id: productId,
    }),
    initialData,
  })

  const data = adventuresDetailsData?.data.data.product

  // Parse data
  const parsedMetadata = generateMetadata({
    name: data?.waypoint?.name,
    metadata: pageData.metadata,
  })

  const headerProps = getPageHeaderProps(data)

  return (
    <>
      <Head {...parsedMetadata} />

      {headerProps && <PageHeader {...headerProps} />}

      <Container>
        {data.id && (
          <ContentRow>
            <PageCta
              as="anchor"
              to={`${routes.payment.url}?productType=adventure&productId=${data.id}`}
            >
              Continue
            </PageCta>
          </ContentRow>
        )}

        <ContentRow>
          <ContentBlock>
            {data.description && <p>{data.description}</p>}
            {data.price_sb && <p>Price: {data.price_sb}</p>}
          </ContentBlock>
        </ContentRow>
      </Container>
    </>
  )
}

export default AdventuresDetailsPage
