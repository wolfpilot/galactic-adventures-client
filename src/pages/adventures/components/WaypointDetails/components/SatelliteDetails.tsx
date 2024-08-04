// Types
import { SatelliteDetails as Props } from "@ts/waypoints/categories/satellite.types"

// Utils
import { formatAtmosphere } from "@utils/helpers/formatter.helpers"

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
  const formattedAtmosphere = formatAtmosphere(otherAtmosphereProps)

  return (
    <TabList>
      <TabItem label="Overview">
        {size && <p>Size: {size}</p>}
        {diameter_km && <p>Diameter: {diameter_km}km</p>}
        {day_length_h && <p>Day Length: {day_length_h}h</p>}
        {orbital_period_d && <p>Orbital Period: {orbital_period_d}d</p>}
        {gravity_n && <p>Gravity: {gravity_n}N</p>}
        {composition && <p>Composition: {composition}</p>}
        {geological_activity?.length && (
          <p>Geological Activity: {geological_activity.join(", ")}</p>
        )}
        {surface_temp_avg_k && (
          <p>Surface Temperature: {surface_temp_avg_k}K</p>
        )}
      </TabItem>

      <TabItem label="Climate">
        {atmosphere && (
          <>
            {atmosphereType && <p>Atmosphere: {atmosphereType}</p>}

            <ul>
              {formattedAtmosphere.elements.map(({ symbol, name, pct }) => (
                <li key={symbol}>
                  {name}: {pct}%
                </li>
              ))}

              {!!formattedAtmosphere.otherPct && (
                <li>Others: {formattedAtmosphere.otherPct}%</li>
              )}
            </ul>
          </>
        )}
        {wind_speed_avg_kmh && <p>Wind Speed: {wind_speed_avg_kmh}km/h</p>}
        {wind_gust_max_kmh && <p>Wind Gusts: {wind_gust_max_kmh}km/h</p>}
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
