// Types
import { SatelliteDetails as Props } from "@ts/waypoints/categories/satellite.types"

// Utils
import {
  formatNumber,
  formatAtmosphereToPct,
} from "@utils/helpers/formatter.helpers"
import {
  useFormatDistanceUnit,
  useFormatSpeedUnit,
  useFormatTemperatureUnit,
} from "@utils/hooks/data"

// Components
import { TabList, TabItem } from "@components/layout/Tabs"

const SatelliteDetails = ({
  size,
  composition,
  geological_activity,
  diameter_km,
  surface_temp_avg_k,
  day_length_h,
  orbital_period_d,
  gravity_n,
  wind_speed_avg_kmh,
  wind_gust_max_kmh,
  precipitation_level,
  precipitation_types,
  weather_alerts,
  atmosphere,
}: Props) => {
  const { type: atmosphereType, ...otherAtmosphereProps } = atmosphere || {}

  // Parse data
  const formattedData = {
    diameter: useFormatDistanceUnit(diameter_km),
    surfaceTempAvg: useFormatTemperatureUnit(surface_temp_avg_k),
    windSpeedAvg: useFormatSpeedUnit(wind_speed_avg_kmh),
    windGustMax: useFormatSpeedUnit(wind_gust_max_kmh),
    dayLengthH: formatNumber(day_length_h),
    orbitalPeriodD: formatNumber(orbital_period_d),
    gravityN: formatNumber(gravity_n),
    atmosphere: formatAtmosphereToPct(otherAtmosphereProps),
  }

  return (
    <TabList>
      <TabItem label="Overview">
        {size && <p>Size: {size}</p>}
        {formattedData.diameter && <p>Diameter: {formattedData.diameter}</p>}
        {formattedData.dayLengthH && (
          <p>Day Length: {formattedData.dayLengthH}h</p>
        )}
        {formattedData.orbitalPeriodD && (
          <p>Orbital Period: {formattedData.orbitalPeriodD}d</p>
        )}
        {formattedData.gravityN && <p>Gravity: {formattedData.gravityN}N</p>}
        {composition && <p>Composition: {composition}</p>}
        {geological_activity?.length && (
          <p>Geological Activity: {geological_activity.join(", ")}</p>
        )}
        {formattedData.surfaceTempAvg && (
          <p>Surface Temperature: {formattedData.surfaceTempAvg}</p>
        )}
      </TabItem>

      <TabItem label="Climate">
        {atmosphere && (
          <>
            {atmosphereType && <p>Atmosphere: {atmosphereType}</p>}

            <ul>
              {formattedData.atmosphere.elements.map(
                ({ symbol, name, pct }) => (
                  <li key={symbol}>
                    {name}: {pct}%
                  </li>
                )
              )}

              {!!formattedData.atmosphere.otherPct && (
                <li>Others: {formattedData.atmosphere.otherPct}%</li>
              )}
            </ul>
          </>
        )}
        {formattedData.windSpeedAvg && (
          <p>Wind Speed: {formattedData.windSpeedAvg}</p>
        )}
        {formattedData.windGustMax && (
          <p>Wind Gusts: {formattedData.windGustMax}</p>
        )}
        {precipitation_level && <p>Precipitation: {precipitation_level}</p>}
        {precipitation_types && (
          <p>Precipitation types: {precipitation_types.join(", ")}</p>
        )}
        {weather_alerts && <p>Weather Alerts: {weather_alerts.join(", ")}</p>}
      </TabItem>
    </TabList>
  )
}

export default SatelliteDetails
