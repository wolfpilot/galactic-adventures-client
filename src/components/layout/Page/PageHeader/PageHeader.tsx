// Types
import { type Props } from "./types"

// Styles
import styles from "./PageHeader.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { CustomImage } from "@components/images"

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
          ${styles.media}
          ${media.isContained ? styles.media__isContained : ""}
        `}
      >
        {media.type === "image" && (
          <CustomImage
            className={`
                ${styles.image}
                ${media.isContained ? styles.image__isContained : ""}
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
