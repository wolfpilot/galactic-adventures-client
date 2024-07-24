// Types
import { type Props } from "./types"

// Constants
import { BREAKPOINTS_PX } from "@constants/layout.constants"

// Styles
import styles from "./PageHeader.module.css"

// Components
import Container from "../Container/Container"
import { CustomImage } from "@components/images"

const PageHeader = ({ media, title, subtitle, description }: Props) => (
  <header className={styles.wrapper}>
    {media && (
      <div className={styles.media}>
        {media.image && (
          <CustomImage
            className={styles.image}
            imgPath={media.image.imgPath}
            srcSetBreakpoints={[
              BREAKPOINTS_PX.XXS,
              BREAKPOINTS_PX.XS,
              BREAKPOINTS_PX.S,
              BREAKPOINTS_PX.M,
              BREAKPOINTS_PX.L,
              BREAKPOINTS_PX.XL,
              BREAKPOINTS_PX.XXL,
            ]}
            sizes="100vw"
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
