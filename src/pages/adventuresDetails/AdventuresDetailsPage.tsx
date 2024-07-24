import { useParams } from "react-router-dom"

// Types
import type { Props as PageHeaderProps } from "@components/layout/PageHeader/types"
import type { WaypointBase } from "@ts/waypoints/waypoint.types"
import { ProductType } from "@ts/products/products.types"

// Data
import { adventuresDetailsPageData as pageData } from "./data/adventuresDetailsPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Hooks
import { useGetProduct } from "@utils/hooks/products"

// Helpers
import { generateMetadata } from "./utils/seo.helpers"
import { categoryToFolderName } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./AdventuresDetailsPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import PageHeader from "@components/layout/PageHeader/PageHeader"
import Container from "@components/layout/Container/Container"
import Section from "@components/layout/Section/Section"
import { Cta } from "@components/ctas"

const AdventuresDetailsPage = () => {
  const { id } = useParams()

  const productId = id ?? null

  const { isPending, error, data } = useGetProduct({
    type: ProductType.adventure,
    id: productId,
  })

  // Utils
  const getPageHeaderProps = (data: WaypointBase): PageHeaderProps => ({
    title: data.name,
    subtitle: data.category,
    media: {
      type: "image",
      image: {
        imgPath: `${categoryToFolderName[data.category]}/${data.code}.webp`,
        alt: `Featured image of ${data.category} ${data.name}.`,
      },
    },
  })

  // Parse data
  const parsedMetadata = generateMetadata({
    name: data?.waypoint?.name,
    metadata: pageData.metadata,
  })

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
        <div className={styles.content}>
          {data.waypoint && (
            <PageHeader {...getPageHeaderProps(data.waypoint)} />
          )}

          <Container>
            {data.id && (
              <div className={styles.ctaWrapper}>
                <Cta
                  as="anchor"
                  href={`${routes.payment.url}?productType=adventure&productId=${data.id}`}
                >
                  Continue
                </Cta>
              </div>
            )}

            <Section>
              <h2 className={styles.subtitle}>About</h2>

              {data.description && <p>{data.description}</p>}
              {data.price_sb && <p>Price: {data.price_sb}</p>}
            </Section>
          </Container>
        </div>
      )}
    </>
  )
}

export default AdventuresDetailsPage
