// Data
import { homePageData } from "./data/homePage.data"

// Utils
import { getRandomItem } from "@utils/helpers/array.helpers"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader } from "@components/layout/Page"
import { ContentRow } from "@components/layout/Content"
import { Marquee } from "@components/banners"

// Setup
const latestNews = getRandomItem(homePageData.newsBannerData)

const HomePage = () => (
  <>
    <Head {...homePageData.metadata} />

    <PageHeader {...homePageData.headerData} />

    {latestNews && (
      <ContentRow isPadded={false}>
        <Marquee>{latestNews}</Marquee>
      </ContentRow>
    )}
  </>
)

export default HomePage
