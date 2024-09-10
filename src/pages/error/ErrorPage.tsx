import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import { AxiosError } from "axios"

// Data
import { defaultError, errorPageData } from "./data/errorPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageCta } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow } from "@components/layout/Content"

// Utils
const parseError = (error: unknown) => {
  switch (true) {
    case isRouteErrorResponse(error):
      return {
        title: error.status.toString(),
        description: error.statusText,
      }
    case error instanceof AxiosError:
      return {
        title: error.response?.status.toString() || defaultError.title,
        description: error.response?.statusText || defaultError.description,
      }
    default:
      console.error(error)

      return errorPageData.defaultError
  }
}

const ErrorPage = () => {
  const error = useRouteError()

  const parsedError = parseError(error)

  return (
    <>
      <Head {...parsedError} />

      <PageHeader {...errorPageData.headerData} {...parsedError} />

      <Container>
        <ContentRow isPadded={false}>
          <PageCta as="anchor" to={routes.home.url}>
            Go back home?
          </PageCta>
        </ContentRow>
      </Container>
    </>
  )
}

export default ErrorPage
