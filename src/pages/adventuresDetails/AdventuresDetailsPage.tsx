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

// Styles
import styles from "./AdventuresDetailsPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import Container from "@components/layout/Container/Container"
import Section from "@components/layout/Section/Section"
import { Cta } from "@components/ctas"
import WaypointMain from "./components/WaypointMain/WaypointMain"

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
          {data.waypoint && <WaypointMain waypoint={data.waypoint} />}

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
