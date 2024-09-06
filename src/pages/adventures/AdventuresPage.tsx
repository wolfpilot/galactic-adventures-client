import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

// Data
import { adventuresPageData as pageData } from "./data/adventuresPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Hooks
import { useGetWaypointById } from "@utils/hooks/waypoints"

// Helpers
import { generateMetadata } from "./utils/seo.helpers"
import { getPageHeaderProps } from "./utils/data.helpers"

// Styles
import styles from "./AdventuresPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow } from "@components/layout/Content"
import { Cta } from "@components/ctas"
import WaypointList from "./components/WaypointList/WaypointList"
import WaypointDetails from "./components/WaypointDetails/WaypointDetails"

const AdventuresPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const waypointIdParam = searchParams.get("waypointId")
  const waypointId = waypointIdParam ?? null

  const { isPending, error, data } = useGetWaypointById({
    id: waypointId,
  })

  // Hooks
  useEffect(() => {
    if (!data?.id) return

    setSearchParams({ waypointId: `${data.id}` }, { replace: true })
  }, [data?.id, setSearchParams])

  // Parse data
  const parsedMetadata = generateMetadata({
    name: data?.name,
    metadata: pageData.metadata,
  })

  const headerProps = getPageHeaderProps(data)

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
        <>
          {headerProps && <PageHeader {...headerProps} />}

          {data.children.length > 0 && (
            <ContentRow isPadded={false}>
              <WaypointList waypoints={data.children} />
            </ContentRow>
          )}

          <Container>
            {data.adventure && (
              <ContentRow>
                <div className={styles.ctaWrapper}>
                  <Cta
                    as="anchor"
                    to={`${routes.adventures.url}/${data.adventure.id}`}
                  >
                    Book now
                  </Cta>
                </div>
              </ContentRow>
            )}

            {data.details && (
              <ContentRow>
                <WaypointDetails waypoint={data} />
              </ContentRow>
            )}
          </Container>
        </>
      )}
    </>
  )
}

export default AdventuresPage
