// Types
import { PlanetDetails as Props } from "@ts/waypoints/categories/planet.types"

// Utils
import { formatAtmosphere } from "@utils/helpers/formatter.helpers"

const PlanetDetails = ({
  is_habitable,
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
    <>
      {is_habitable && <p>Habitable: {is_habitable ? "Yes" : "No"}</p>}
      {size && <p>Size: {size}</p>}
      {composition && <p>Composition: {composition}</p>}
      {geological_activity?.length && (
        <p>Geological Activity: {geological_activity.join(", ")}</p>
      )}
      {diameter_km && <p>Diameter: {diameter_km}km</p>}
      {surface_temp_avg_k && <p>Surface Temperature: {surface_temp_avg_k}K</p>}
      {day_length_h && <p>Day Length: {day_length_h}h</p>}
      {orbital_period_d && <p>Orbital Period: {orbital_period_d}d</p>}
      {gravity_n && <p>Gravity: {gravity_n}N</p>}
      {wind_speed_avg_kmh && <p>Wind Speed: {wind_speed_avg_kmh}km/h</p>}
      {wind_gust_max_kmh && <p>Wind Gusts: {wind_gust_max_kmh}km/h</p>}
      {precipitation_level && <p>Precipitation: {precipitation_level}</p>}
      {precipitation_types && (
        <p>Precipitation types: {precipitation_types.join(", ")}</p>
      )}
      {weather_alerts && <p>Weather Alerts: {weather_alerts.join(", ")}</p>}
      {atmosphere && (
        <div>
          <h3>Atmosphere</h3>

          {atmosphereType && <p>Type: {atmosphereType}</p>}

          {formattedAtmosphere.elements.map(({ symbol, name, pct }) => (
            <p key={symbol}>
              {name}: {pct}%
            </p>
          ))}

          {!!formattedAtmosphere.otherPct && (
            <p>Others: {formattedAtmosphere.otherPct}%</p>
          )}
        </div>
      )}
    </>
  )
}

export default PlanetDetails
