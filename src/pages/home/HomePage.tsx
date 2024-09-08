import { useEffect } from "react"

// Data
import { homePageData } from "./data/homePage.data"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { getCtaImageProps } from "./helpers/data.helpers"

// Constants
import { navRoutes } from "@constants/routes.constants"

// Styles
import styles from "./HomePage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"
import { CustomImage } from "@components/media"
import { CustomLink } from "@components/links"

const HomePage = () => {
  const updateSiteBannerNewsData = useAppBoundStore(
    (state) => state.updateBannerNewsData
  )

  useEffect(() => {
    if (!homePageData.siteBannerNewsData) return

    updateSiteBannerNewsData(homePageData.siteBannerNewsData)
  }, [updateSiteBannerNewsData])

  return (
    <>
      <Head {...homePageData.metadata} />

      <PageHeader {...homePageData.headerData} />

      <Container>
        <ContentRow isPadded={false}>
          <ul className={styles.ctaList}>
            {navRoutes.map((route, index) => {
              const imgProps = getCtaImageProps(route)

              return (
                <li key={index} className={styles.ctaItem}>
                  <ContentBlock>
                    <CustomLink
                      className={styles.ctaItemLink}
                      to={route.url}
                      aria-disabled={route.disabled}
                    >
                      {imgProps && (
                        <CustomImage
                          {...imgProps}
                          className={styles.ctaItemImage}
                        />
                      )}
                      <div className={styles.ctaItemContent}>{route.label}</div>
                    </CustomLink>
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
