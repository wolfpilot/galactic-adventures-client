// Types
import { Waypoint } from "@ts/waypoints/waypoint.types"

// Utils
import { getImagePath } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./WaypointMain.module.css"

export interface Props {
  data: Waypoint
}

const WaypointMain = ({ data }: Props) => {
  const { name, code, category } = data

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`${getImagePath(category)}/${code}.webp`}
        />
      </div>

      <div className={styles.content}>
        {name && <h1 className={styles.title}>{name}</h1>}
        {category && <h2 className={styles.subtitle}>{category}</h2>}
      </div>
    </div>
  )
}

export default WaypointMain
