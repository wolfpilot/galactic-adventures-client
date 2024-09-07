import { useParams } from "react-router-dom"

// Types
import { ProductType } from "@ts/products/products.types"

// Data
import { adventuresDetailsPageData as pageData } from "./data/adventuresDetailsPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Hooks
import { useGetProduct } from "@utils/hooks/products"

// Helpers
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

  const { isPending, error, data } = useGetProduct({
    type: ProductType.adventure,
    id: productId,
  })

  // Parse data
  const parsedMetadata = generateMetadata({
    name: data?.waypoint?.name,
    metadata: pageData.metadata,
  })

  const headerProps = getPageHeaderProps(data)

  return (
    <>
      <Head {...parsedMetadata} />

      {isPending && <p>Loading...</p>}

      {error && (
        <p>
          Oops, can't find adventure! Please select a new configuration for your
          new exciting adventure.
        </p>
      )}

      {data && (
        <>
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
      )}
    </>
  )
}

export default AdventuresDetailsPage
