// Data
import { errorPageData } from "./data/errorPage.data"

// Constants
import { routes } from "@constants/routes.constants"

// Styles
import styles from "./ErrorPage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow } from "@components/layout/Content"
import { Cta } from "@components/ctas"

const ErrorPage = () => {
  return (
    <>
      <Head {...errorPageData.metadata} />

      <PageHeader {...errorPageData.headerData} />

      <Container>
        <ContentRow isPadded={false}>
          <div className={styles.ctaWrapper}>
            <Cta as="anchor" href={routes.home.url}>
              Go back home
            </Cta>
          </div>
        </ContentRow>
      </Container>
    </>
  )
}

export default ErrorPage
