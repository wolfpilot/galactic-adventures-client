// Types
import { Props } from "./types"

// Constants
import { routes } from "@constants/routes.constants"

// Utils
import { categoryToFolderName } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./WaypointList.module.css"

// Components
import Scroller from "@components/sliders/Scroller/Scroller"
import { ProgressiveImage } from "@components/images"

const WaypointList = ({ waypoints }: Props) => (
  <Scroller className={styles.wrapper!}>
    <ul className={styles.list}>
      {waypoints.map((item) => {
        const { id, category, code, name, adventure } = item

        const imgPath = `${categoryToFolderName[category]}/${code}-thumb.webp`

        return (
          <li key={id} className={styles.item}>
            <a
              className={styles.itemLink}
              href={`${routes.adventures.url}?waypointId=${id}`}
            >
              <div className={styles.itemImageWrapper}>
                <ProgressiveImage
                  className={styles.itemImage}
                  path={imgPath}
                  placeholderSizePx={4}
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
  </Scroller>
)

export default WaypointList
