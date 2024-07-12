// Types
import { WaypointChildPartial } from "@ts/waypoints/waypoint.types"

// Constants
import { routes } from "@constants/routes.constants"

// Utils
import { getImagePath } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./WaypointList.module.css"

export interface Props {
  waypoints: WaypointChildPartial[]
}

const WaypointList = ({ waypoints }: Props) => (
  <div className={styles.wrapper}>
    <ul className={styles.list}>
      {waypoints.map((item) => {
        const { id, category, code, name, adventure } = item

        return (
          <li key={id} className={styles.item}>
            <a
              className={styles.itemLink}
              href={`${routes.adventures.url}?waypointId=${id}`}
            >
              <div className={styles.itemImageWrapper}>
                <img
                  className={styles.itemImage}
                  src={`${getImagePath(category)}/${code}-thumb.webp`}
                  alt={`Thumbnail image of ${category} ${name}.`}
                />

                {adventure?.id && <div className={styles.itemBadge}>{`⚑`}</div>}
              </div>

              {name && <h3 className={styles.itemName}>{name}</h3>}
            </a>
          </li>
        )
      })}
    </ul>
  </div>
)

export default WaypointList
