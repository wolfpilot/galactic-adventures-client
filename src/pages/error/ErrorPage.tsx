import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import { isAxiosError } from "axios"

// Data
import { errorPageData } from "./data/errorPage.data"

// Constants
import { routes } from "@constants/routes.constants"
import { errors } from "@constants/errors.constants"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent, PageCta } from "@components/layout/Page"
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
    case isAxiosError(error):
      return {
        title: error.response?.status.toString() || errors.Default.title,
        description: error.response?.statusText || errors.Default.description,
      }
    default:
      console.error(error)

      return errors.Default
  }
}

const ErrorPage = () => {
  const error = useRouteError()

  const parsedError = parseError(error)

  return (
    <>
      <Head {...parsedError} />

      <PageHeader {...errorPageData.headerData} {...parsedError} />

      <PageContent>
        <Container>
          <ContentRow isPadded={false}>
            <PageCta as="anchor" to={routes.home.url}>
              Go back home?
            </PageCta>
          </ContentRow>
        </Container>
      </PageContent>
    </>
  )
}

export default ErrorPage
