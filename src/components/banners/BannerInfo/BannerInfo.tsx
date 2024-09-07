// Types
import { Props } from "./types"

// Styles
import styles from "./BannerInfo.module.css"

// Components
import Container from "@components/layout/Container/Container"
import Icon from "@components/icons/Icon"

const BannerInfo = ({
  className = "",
  title,
  text,
  isClosed,
  onCloseHandler,
}: Props) => (
  <>
    {title && text && (
      <aside
        className={`
          ${styles.wrapper}
          ${isClosed ? styles.wrapper__isClosed : ""}
          ${className}
        `}
      >
        <Container>
          <header className={styles.header}>
            <h4 className={styles.title}>{title}</h4>

            <button className={styles.closeBtn} onClick={onCloseHandler}>
              <Icon
                className={styles.closeBtnIcon}
                type="Close"
                width={24}
                height={24}
              />
            </button>
          </header>

          <div className={styles.content}>{text}</div>
        </Container>
      </aside>
    )}
  </>
)

export default BannerInfo
