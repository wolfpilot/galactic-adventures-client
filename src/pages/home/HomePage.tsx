// Data
import { homePageData } from "./data/homePage.data"

// Components
import Head from "@components/layout/Head/Head"
import { PageHeader } from "@components/layout/Page"

const HomePage = () => (
  <>
    <Head {...homePageData.metadata} />

    <PageHeader {...homePageData.headerData} />
  </>
)

export default HomePage
