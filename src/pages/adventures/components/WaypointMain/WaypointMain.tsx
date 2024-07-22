// Types
import { Props } from "./types"

// Constants
import { BREAKPOINTS_PX } from "@constants/layout.constants"

// Utils
import { categoryToFolderName } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./WaypointMain.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { CustomImage } from "@components/images"

// Setup
const srcSetBreakpoints = [
  BREAKPOINTS_PX.XXS,
  BREAKPOINTS_PX.XS,
  BREAKPOINTS_PX.S,
  BREAKPOINTS_PX.M,
  BREAKPOINTS_PX.L,
  BREAKPOINTS_PX.XL,
  BREAKPOINTS_PX.XXL,
]

const WaypointMain = ({ waypoint }: Props) => {
  const { name, code, category } = waypoint

  const imgPath = `${categoryToFolderName[category]}/${code}.webp`

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <CustomImage
          className={styles.image}
          imgPath={imgPath}
          srcSetBreakpoints={srcSetBreakpoints}
          sizes="100vw"
          alt={`Featured image of ${category} ${name}.`}
        />
      </div>

      <Container>
        <div className={styles.content}>
          {name && <h1 className={styles.title}>{name}</h1>}
          {category && <h2 className={styles.subtitle}>{category}</h2>}
        </div>
      </Container>
    </div>
  )
}

export default WaypointMain
