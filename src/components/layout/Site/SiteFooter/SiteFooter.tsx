// Types
import { DistanceUnit, TemperatureUnit } from "@ts/global.types"

// Utils
import { useBoundStore } from "@utils/stores/store"

// Styles
import styles from "./SiteFooter.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { SwitchField } from "@components/form/fields"

const SiteFooter = () => {
  const date = new Date().getFullYear()

  const units = useBoundStore((state) => state.units)

  const updateDistanceUnit = useBoundStore((state) => state.updateDistanceUnit)
  const updateTemperatureUnit = useBoundStore(
    (state) => state.updateTemperatureUnit
  )

  // Handlers
  const handleOnDistanceUnitChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newUnit = e.target.checked
      ? DistanceUnit.miles
      : DistanceUnit.kilometres

    updateDistanceUnit(newUnit)
  }

  const handleOnTemperatureUnitChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newUnit = e.target.checked
      ? TemperatureUnit.celsius
      : TemperatureUnit.kelvin

    updateTemperatureUnit(newUnit)
  }

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
              checked={
                units.distance === DistanceUnit.kilometres ? false : true
              }
              options={[DistanceUnit.kilometres, DistanceUnit.miles]}
              changeHandler={handleOnDistanceUnitChange}
            />

            <SwitchField
              className={styles.settingsBtn}
              name="temperature"
              checked={
                units.temperature === TemperatureUnit.kelvin ? false : true
              }
              options={[TemperatureUnit.kelvin, TemperatureUnit.celsius]}
              changeHandler={handleOnTemperatureUnitChange}
            />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default SiteFooter
