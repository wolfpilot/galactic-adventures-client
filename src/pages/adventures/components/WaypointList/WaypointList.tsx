import { Link } from "react-router-dom"

// Types
import { Props } from "./types"

// Constants
import { routes } from "@constants/routes.constants"
import { WAYPOINT_FALLBACK_THUMB_IMG } from "@constants/assets.constants"

// Utils
import { waypointCategoryToFolderName } from "@utils/helpers/asset.helpers"

// Styles
import styles from "./WaypointList.module.css"

// Components
import Scroller from "@components/sliders/Scroller/Scroller"
import { CustomImage } from "@components/media"
import Icon from "@components/icons/Icon"

// Setup
const DEFAULT_IMAGE_SIZE = 240
const DEFAULT_BADGE_SIZE = 32

const WaypointList = ({ waypoints }: Props) => (
  <div className={styles.wrapper}>
    <Scroller className={styles.scroller!}>
      <ul className={styles.list}>
        {waypoints.map((item) => {
          const { id, category, code, name, adventure } = item

          const imgProps = {
            imgPath: `${waypointCategoryToFolderName[category]}/${code}-sq.webp`,
            fallbackImgPath: WAYPOINT_FALLBACK_THUMB_IMG,
            transforms: {
              scale: {
                width: DEFAULT_IMAGE_SIZE,
                height: DEFAULT_IMAGE_SIZE,
              },
            },
            alt: `Thumbnail image of ${category} ${name}.`,
          }

          return (
            <li key={id} className={styles.item}>
              <Link
                className={styles.itemLink}
                to={`${routes.adventures.url}?waypointId=${id}`}
              >
                <figure className={styles.itemFigure}>
                  <div className={styles.itemImageWrapper}>
                    <CustomImage className={styles.itemImage} {...imgProps} />

                    {adventure?.id && (
                      <div className={styles.itemBadge}>
                        <Icon
                          className={styles.itemBadgeIcon}
                          type="SpaceFlight"
                          width={DEFAULT_BADGE_SIZE}
                          height={DEFAULT_BADGE_SIZE}
                        />
                      </div>
                    )}
                  </div>

                  {name && (
                    <figcaption className={styles.itemFigCaption}>
                      {name}
                    </figcaption>
                  )}
                </figure>
              </Link>
            </li>
          )
        })}
      </ul>
    </Scroller>
  </div>
)

export default WaypointList
