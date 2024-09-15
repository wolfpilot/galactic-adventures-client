import { useEffect } from "react"

// Data
import { homePageData as pageData } from "./data/homePage.data"

// Utils
import { useAppBoundStore } from "@utils/stores"
import { getCtaImageProps } from "./helpers/data.helpers"

// Constants
import { navRoutes } from "@constants/routes.constants"

// Styles
import styles from "./HomePage.module.css"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader, PageContent } from "@components/layout/Page"
import Container from "@components/layout/Container/Container"
import { ContentRow, ContentBlock } from "@components/layout/Content"
import { CustomImage } from "@components/media"
import { CustomLink } from "@components/links"

const HomePage = () => {
  const updateIsLoading = useAppBoundStore((state) => state.updateIsLoading)

  const updateBannerNewsData = useAppBoundStore(
    (state) => state.updateBannerNewsData
  )

  // Hooks
  useEffect(() => {
    updateIsLoading(false)
  }, [updateIsLoading])

  useEffect(() => {
    if (!pageData.siteBannerNewsData) return

    updateBannerNewsData(pageData.siteBannerNewsData)
  }, [updateBannerNewsData])

  return (
    <>
      <Head {...pageData.metadata} />

      <PageHeader {...pageData.headerData} />

      <PageContent>
        <Container>
          <ContentRow isPadded={false}>
            <ul className={styles.ctaList}>
              {navRoutes.map((route, index) => {
                const imgProps = getCtaImageProps(route)

                return (
                  <li key={index} className={styles.ctaItem}>
                    <ContentBlock className={styles.ctaItemContentBlock}>
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
                        <div className={styles.ctaItemContent}>
                          <div className={styles.ctaItemLabel}>
                            {route.label}
                          </div>

                          {route.disabled && (
                            <div className={styles.ctaItemNotice}>
                              Coming soon
                            </div>
                          )}
                        </div>
                      </CustomLink>
                    </ContentBlock>
                  </li>
                )
              })}
            </ul>
          </ContentRow>
        </Container>
      </PageContent>
    </>
  )
}

export default HomePage
