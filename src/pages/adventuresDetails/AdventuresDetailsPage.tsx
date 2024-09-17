import { useEffect } from "react"
import { useParams, useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

// Types
import { ProductType } from "@ts/products/products.types"

// Data
import { pageData } from "./data/adventuresDetailsPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { adventuresDetailsLoader as loader } from "@utils/loaders"
import { getProductByTypeAndIdQuery as query } from "@utils/queries"
import { generateMetadata } from "./utils/seo.helpers"
import { getPageHeaderProps } from "./utils/data.helpers"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent, PageCta } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"

const AdventuresDetailsPage = () => {
  const updateAppIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const { id } = useParams()
  const productId = id ?? null

  // Fetch cached or fresh data
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >

  const { data, isPending } = useQuery({
    ...query({
      type: ProductType.adventure,
      id: productId,
    }),
    initialData,
  })

  // Hooks
  useEffect(() => {
    if (isPending) return

    updateAppIsLoading(false)
  }, [isPending, updateAppIsLoading])

  // Parse data
  const parsedMetadata = generateMetadata({
    name: data.product?.waypoint?.name,
    metadata: pageData.metadata,
  })

  const headerProps = getPageHeaderProps(data.product)

  return (
    <>
      <Head {...parsedMetadata} />

      {headerProps && <PageHeader {...headerProps} />}

      {data && (
        <PageContent>
          <Container>
            {data.product.id && (
              <ContentRow>
                <PageCta
                  as="anchor"
                  to={`${routes.payment.url}?productType=adventure&productId=${data.product.id}`}
                >
                  Continue
                </PageCta>
              </ContentRow>
            )}

            <ContentRow>
              <ContentBlock>
                {data.product.description && <p>{data.product.description}</p>}
                {data.product.price_sb && <p>Price: {data.product.price_sb}</p>}
              </ContentBlock>
            </ContentRow>
          </Container>
        </PageContent>
      )}
    </>
  )
}

export default AdventuresDetailsPage
