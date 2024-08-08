// Types
import { StarDetails as Props } from "@ts/waypoints/categories/star.types"

// Utils
import {
  formatTemperature,
  formatAtmosphere,
} from "@utils/helpers/formatter.helpers"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const StarDetails = ({
  life_cycle,
  mass,
  spectral_class,
  atmosphere,
}: Props) => {
  const { type: atmosphereType, ...otherAtmosphereProps } = atmosphere || {}

  // Parse data
  const formattedTemp = formatTemperature({
    min: spectral_class.temperature_min_k,
    max: spectral_class.temperature_max_k,
  })
  const formattedAtmosphere = formatAtmosphere(otherAtmosphereProps)

  return (
    <TabList>
      <TabItem label="Overview">
        {life_cycle && <p>Life Cycle Stage: {life_cycle}</p>}
        {mass && <p>Mass: {mass}</p>}

        {spectral_class && (
          <div>
            <h3>Spectral Classification</h3>

            {spectral_class.class && <p>Class: {spectral_class.class}</p>}
            {spectral_class.chromacity && (
              <p>Chromacity: {spectral_class.chromacity}</p>
            )}
            {formattedTemp && <p>Temperature: {formattedTemp}</p>}
          </div>
        )}
      </TabItem>

      <TabItem label="Atmosphere">
        {atmosphereType && <p>Type: {atmosphereType}</p>}

        {formattedAtmosphere.elements.map(({ symbol, name, pct }) => (
          <p key={symbol}>
            {name}: {pct}%
          </p>
        ))}

        {!!formattedAtmosphere.otherPct && (
          <p>Others: {formattedAtmosphere.otherPct}%</p>
        )}
      </TabItem>
    </TabList>
  )
}

export default StarDetails
