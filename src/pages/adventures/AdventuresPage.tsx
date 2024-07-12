import { useSearchParams } from "react-router-dom"

// Data
import { adventuresPageData as pageData } from "./data/adventuresPage.data"

// Hooks
import { useGetWaypointById } from "@utils/hooks/waypoints"

// Helpers
import { generateMetadata } from "./utils/seo.helpers"
import { renderDetailsByCategory } from "./utils/render.helpers"

// Styles
import styles from "./AdventuresPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
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
          <WaypointMain data={data} />

          {data.children.length > 0 && (
            <div className={styles.waypointListWrapper}>
              <WaypointList data={data.children} />
            </div>
          )}

          {/* <div className={styles.dataSheet}> */}
          {data.details && (
            <div className={styles.detailsWrapper}>
              <h2 className={styles.subtitle}>About</h2>

              {renderDetailsByCategory(data)}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AdventuresPage
