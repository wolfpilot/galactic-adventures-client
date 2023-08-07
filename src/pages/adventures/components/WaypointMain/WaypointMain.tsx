// Types
import { Waypoint } from "@ts/waypoints/waypoint.types"

// Utils
import { categoryToFolderName } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./WaypointMain.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { Image } from "@components/images"

export interface Props {
  waypoint: Waypoint
}

const WaypointMain = ({ waypoint }: Props) => {
  const { name, code, category } = waypoint

  const imgPath = `${categoryToFolderName[category]}/${code}.webp`

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          path={imgPath}
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
