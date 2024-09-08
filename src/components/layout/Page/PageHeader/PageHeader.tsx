// Types
import { type Props } from "./types"

// Styles
import styles from "./PageHeader.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { CustomImage } from "@components/images"
import { CustomVideo } from "@components/media"

const PageHeader = ({
  className = "",
  media,
  title,
  subtitle,
  description,
}: Props) => (
  <header
    className={`
      ${styles.wrapper}
      ${!media ? styles.wrapper__isSpaced : ""}
      ${className}
    `}
  >
    {media && (
      <div
        className={`
          ${styles.mediaWrapper}
          ${media.isContained ? styles.mediaWrapper__isContained : ""}
        `}
      >
        {media.type === "video" && (
          <CustomVideo
            className={`
              ${styles.media}
              ${media.isContained ? styles.media__isContained : ""}
            `}
            {...media.video}
          />
        )}

        {media.type === "image" && (
          <CustomImage
            className={`
              ${styles.media}
              ${media.isContained ? styles.media__isContained : ""}
            `}
            {...media.image}
          />
        )}
      </div>
    )}

    <Container>
      <div
        className={`
          ${styles.content}
          ${media ? styles.content__hasMedia : ""}
        `}
      >
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </Container>
  </header>
)

export default PageHeader
