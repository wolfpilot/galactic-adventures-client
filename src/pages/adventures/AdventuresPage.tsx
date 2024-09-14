import { useEffect } from "react"
import { useSearchParams, useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

// Data
import { pageData } from "./data/adventuresPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { adventuresLoader as loader } from "@utils/loaders"
import { getWaypointByIdQuery as query } from "@utils/queries"
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
  const updateIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const [searchParams] = useSearchParams()
  const waypointIdParam = searchParams.get("waypointId")
  const waypointId = waypointIdParam ?? null

  // Fetch cached or fresh data
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >

  const { data: waypointData, isPending: waypointIsPending } = useQuery({
    ...query({
      id: waypointId,
    }),
    initialData,
  })

  const data = {
    waypoint: waypointData?.data?.data?.waypoint,
  }

  const hasData = !!data.waypoint

  // Hooks
  useEffect(() => {
    if (waypointIsPending) return

    updateIsLoading(false)
  }, [waypointIsPending, updateIsLoading])

  useEffect(() => {
    if (waypointIdParam || !data.waypoint.id) return

    updateQueryString("waypointId", `${data.waypoint.id}`)
  }, [data.waypoint?.id, waypointIdParam])

  // Parse data
  const parsedMetadata = generateMetadata({
    name: data.waypoint?.name,
    metadata: pageData.metadata,
  })

  const headerProps = getPageHeaderProps(data.waypoint)

  return (
    <>
      <Head {...parsedMetadata} />

      {headerProps && <PageHeader {...headerProps} />}

      {hasData && (
        <>
          {data.waypoint.children.length > 0 && (
            <ContentRow isPadded={false}>
              <WaypointList waypoints={data.waypoint.children} />
            </ContentRow>
          )}

          <Container>
            {data.waypoint.adventure && (
              <ContentRow>
                <PageCta
                  as="anchor"
                  to={`${routes.adventures.url}/${data.waypoint.adventure.id}`}
                >
                  Book now
                </PageCta>
              </ContentRow>
            )}

            {data.waypoint.details && (
              <ContentRow>
                <WaypointDetails waypoint={data.waypoint} />
              </ContentRow>
            )}
          </Container>
        </>
      )}
    </>
  )
}

export default AdventuresPage
