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
import { CustomImage } from "@components/images"

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
        <ContentRow isPadded={false}>
          <ul className={styles.ctaList}>
            {navRoutes.map((route, index) => {
              const imgPath = `Pages/Homepage/cta-${route.url.substring(1)}.webp`

              return (
                <li key={index} className={styles.ctaItem}>
                  <ContentBlock>
                    <a href={route.url} className={styles.ctaItemLink}>
                      <CustomImage
                        className={styles.ctaItemImage}
                        imgPath={imgPath}
                        alt=""
                      />
                      <div className={styles.ctaItemContent}>{route.label}</div>
                    </a>
                  </ContentBlock>
                </li>
              )
            })}
          </ul>
        </ContentRow>
      </Container>
    </>
  )
}

export default HomePage
