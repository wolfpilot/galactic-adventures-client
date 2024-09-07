// Data
import { errorPageData } from "./data/errorPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageCta } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow } from "@components/layout/Content"

const ErrorPage = () => (
  <>
    <Head {...errorPageData.metadata} />

    <PageHeader {...errorPageData.headerData} />

    <Container>
      <ContentRow isPadded={false}>
        <PageCta as="anchor" to={routes.home.url}>
          Go back home
        </PageCta>
      </ContentRow>
    </Container>
  </>
)

export default ErrorPage
