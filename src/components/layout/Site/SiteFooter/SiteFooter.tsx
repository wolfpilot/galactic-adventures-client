// Styles
import styles from "./SiteFooter.module.css"

// Components
import Container from "@components/layout/Container/Container"

const SiteFooter = () => {
  const date = new Date().getFullYear()

  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.content}>
          © Copyright {date} Galactic Adventures Ltd. All Rights Reserved.
        </div>
      </Container>
    </footer>
  )
}

export default SiteFooter
