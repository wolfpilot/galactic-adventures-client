// Types
import { Waypoint } from "@ts/waypoints/waypoint.types"

// Utils
import { getImagePath } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./WaypointMain.module.css"

// Components
import Container from "@components/layout/Container/Container"

export interface Props {
  waypoint: Waypoint
}

const WaypointMain = ({ waypoint }: Props) => {
  const { name, code, category } = waypoint

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`${getImagePath(category)}/${code}.webp`}
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
