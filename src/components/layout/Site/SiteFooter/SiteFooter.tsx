// Types
import { DistanceUnit, TemperatureUnit } from "@ts/global.types"

// Styles
import styles from "./SiteFooter.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { SwitchField } from "@components/form/fields"

const SiteFooter = () => {
  const date = new Date().getFullYear()

  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            © Copyright {date} Galactic Adventures Ltd. All Rights Reserved.
          </div>

          <div className={styles.settings}>
            <SwitchField
              className={styles.settingsBtn}
              name="distance"
              options={[DistanceUnit.kilometres, DistanceUnit.miles]}
            />

            <SwitchField
              className={styles.settingsBtn}
              name="temperature"
              options={[TemperatureUnit.kelvin, TemperatureUnit.celsius]}
            />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default SiteFooter
