import { useEffect } from "react"
import { useSearchParams, useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

// Data
import { adventuresPageData as pageData } from "./data/adventuresPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Utils
import {
  getWaypointByIdLoader as loader,
  getWaypointByIdQuery as query,
} from "@utils/loaders"
import { generateMetadata } from "./utils/seo.helpers"
import { getPageHeaderProps } from "./utils/data.helpers"
import { updateQueryString } from "@utils/helpers/window.helpers"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageCta } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow } from "@components/layout/Content"
import WaypointList from "./components/WaypointList/WaypointList"
import WaypointDetails from "./components/WaypointDetails/WaypointDetails"

const AdventuresPage = () => {
  const [searchParams] = useSearchParams()

  const waypointIdParam = searchParams.get("waypointId")
  const waypointId = waypointIdParam ?? null

  // Fetch cached or new data
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >

  const { data: adventuresData } = useQuery({
    ...query({
      id: waypointId,
    }),
    initialData,
  })

  const data = adventuresData?.data?.data?.waypoint

  // Hooks
  useEffect(() => {
    if (waypointIdParam || !data?.id) return

    updateQueryString("waypointId", `${data.id}`)
  }, [data?.id, waypointIdParam])

  // Parse data
  const parsedMetadata = generateMetadata({
    name: data?.name,
    metadata: pageData.metadata,
  })

  const headerProps = getPageHeaderProps(data)

  return (
    <>
      <Head {...parsedMetadata} />

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
                <PageCta
                  as="anchor"
                  to={`${routes.adventures.url}/${data.adventure.id}`}
                >
                  Book now
                </PageCta>
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
