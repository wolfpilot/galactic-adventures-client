import { useSearchParams } from "react-router-dom"

// Data
import { adventuresPageData as pageData } from "./data/adventuresPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Hooks
import { useGetWaypointById } from "@utils/hooks/waypoints"

// Helpers
import { generateMetadata } from "./utils/seo.helpers"
import { renderDetailsByCategory } from "./utils/render.helpers"

// Styles
import styles from "./AdventuresPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import Container from "@components/layout/Container/Container"
import ContentBlock from "@components/layout/ContentBlock/ContentBlock"
import WaypointMain from "./components/WaypointMain/WaypointMain"
import WaypointList from "./components/WaypointList/WaypointList"

const AdventuresPage = () => {
  const [searchParams] = useSearchParams()

  const waypointIdParam = searchParams.get("waypointId")
  const waypointId = waypointIdParam ?? null

  const { isPending, error, data } = useGetWaypointById({
    id: waypointId,
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
          <WaypointMain waypoint={data} />

          {data.children.length > 0 && (
            <div className={styles.waypointListWrapper}>
              <WaypointList waypoints={data.children} />
            </div>
          )}

          {data.adventure && (
            <Container>
              <div className={styles.ctaWrapper}>
                <a
                  className={styles.ctaAdventure}
                  href={`${routes.adventures.url}/${data.adventure.id}`}
                >
                  Book now
                </a>
              </div>
            </Container>
          )}

          {data.details && (
            <Container>
              <ContentBlock kind="secondary">
                <h2 className={styles.subtitle}>About</h2>

                {renderDetailsByCategory(data)}
              </ContentBlock>
            </Container>
          )}
        </div>
      )}
    </>
  )
}

export default AdventuresPage
