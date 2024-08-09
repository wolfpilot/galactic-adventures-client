import { useEffect } from "react"

// Data
import { homePageData } from "./data/homePage.data"

// Utils
import { useBoundStore } from "@utils/stores/store"

// Constants
import { navRoutes } from "@constants/routes.constants"

// Styles
import styles from "./HomePage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"

const HomePage = () => {
  const updateSiteBannerData = useBoundStore((state) => state.updateBannerData)

  useEffect(() => {
    if (!homePageData.siteBannerData) return

    updateSiteBannerData(homePageData.siteBannerData)
  }, [updateSiteBannerData])

  return (
    <>
      <Head {...homePageData.metadata} />

      <PageHeader {...homePageData.headerData} />

      <Container>
        <ContentRow>
          <ul className={styles.ctaList}>
            {navRoutes.map((route, index) => (
              <li key={index} className={styles.ctaItem}>
                <ContentBlock>
                  <a href={route.url}>{route.label}</a>
                </ContentBlock>
              </li>
            ))}
          </ul>
        </ContentRow>
      </Container>
    </>
  )
}

export default HomePage
