import { useSearchParams } from "react-router-dom"

// Types
import type { Props as PageHeaderProps } from "@components/layout/PageHeader/types"
import type { Waypoint } from "@ts/waypoints/waypoint.types"

// Data
import { adventuresPageData as pageData } from "./data/adventuresPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Hooks
import { useGetWaypointById } from "@utils/hooks/waypoints"

// Helpers
import { generateMetadata } from "./utils/seo.helpers"
import { renderDetailsByCategory } from "./utils/render.helpers"
import { categoryToFolderName } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./AdventuresPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import PageHeader from "@components/layout/PageHeader/PageHeader"
import Container from "@components/layout/Container/Container"
import Section from "@components/layout/Section/Section"
import { Cta } from "@components/ctas"
import WaypointList from "./components/WaypointList/WaypointList"

const AdventuresPage = () => {
  const [searchParams] = useSearchParams()

  const waypointIdParam = searchParams.get("waypointId")
  const waypointId = waypointIdParam ?? null

  const { isPending, error, data } = useGetWaypointById({
    id: waypointId,
  })

  // Utils
  const getPageHeaderProps = (data: Waypoint): PageHeaderProps => ({
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
    name: data?.name,
    metadata: pageData.metadata,
  })

  return (
    <>
      <Head {...parsedMetadata} />

      {isPending && <p>Loading...</p>}

      {error && (
        <p>
          Oops, can't find destination! Please select a new configuration for
          your new exciting adventure.
        </p>
      )}

      {data && (
        <div className={styles.content}>
          <PageHeader {...getPageHeaderProps(data)} />

          {data.children.length > 0 && (
            <div className={styles.waypointListWrapper}>
              <WaypointList waypoints={data.children} />
            </div>
          )}

          <Container>
            {data.adventure && (
              <div className={styles.ctaWrapper}>
                <Cta
                  as="anchor"
                  href={`${routes.adventures.url}/${data.adventure.id}`}
                >
                  Book now
                </Cta>
              </div>
            )}

            {data.details && (
              <Section>
                <h2 className={styles.subtitle}>About</h2>

                {renderDetailsByCategory(data)}
              </Section>
            )}
          </Container>
        </div>
      )}
    </>
  )
}

export default AdventuresPage
