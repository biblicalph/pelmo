import React from 'react';
import PropTypes from 'prop-types';

const WeatherInfoListItem = ({ children }) => (<li data-test="weather-info.item">{children}</li>);
WeatherInfoListItem.propTypes = {
  children: PropTypes.node.isRequired
};

const WeatherInfo = ({
  condition,
  feelsLike,
  icon,
  updatedAt,
  temperature,
  temperatureUnit
}) => {
  return (
    <ul data-test="weather-info">
      <WeatherInfoListItem>
        <span>Last updated time</span><span>{updatedAt}</span>
      </WeatherInfoListItem>
      <WeatherInfoListItem>
        <span>Condition</span><span>{condition}</span>
      </WeatherInfoListItem>
      <WeatherInfoListItem>
        <span>Temperature</span><span>{temperature}{temperature && (<sup>o</sup>)}</span>
      </WeatherInfoListItem>
      <WeatherInfoListItem>
        <span>Feels like</span><span>{feelsLike}</span>
      </WeatherInfoListItem>
      <WeatherInfoListItem>
        <span>Temperature unit</span><span>{temperatureUnit}</span>
      </WeatherInfoListItem>
      <WeatherInfoListItem>
        <span>Weather icon</span><span>{icon && <i className={`wi wi-wmo4680-${icon}`}></i>}</span>
      </WeatherInfoListItem>
    </ul>
  ); 
};

WeatherInfo.propTypes = {
  condition: PropTypes.string.isRequired,
  feelsLike: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  temperatureUnit: PropTypes.string.isRequired
};

export default WeatherInfo;