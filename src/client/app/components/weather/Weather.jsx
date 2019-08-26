import 'App/components/weather/weather.css';
import WeatherInfo from 'App/components/weatherDetails';
import { useSetPageTitle } from 'App/utils';
import { routeList } from 'App/utils/index';
import montrealImg from 'Assets/img/montreal.jpg';
import torontoImg from 'Assets/img/toronto.jpg';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const getCityImage = (city) => city.toLowerCase() === 'montreal' ? montrealImg : torontoImg;

const Weather = ({
  city,
  errorMessage,
  shouldLoadInfo,
  isFetching,
  weatherInfo,
  fetchWeatherDetails
}) => {
  useSetPageTitle(`Weather information for ${city}`);
  useEffect(() => {
    if (shouldLoadInfo) {
      fetchWeatherDetails(city);
    }
  }, [city, shouldLoadInfo]);
  let content;

  if (errorMessage) {
    content = (<p data-test="weather.error-message">{errorMessage}</p>);
  } else if (isFetching) {
    content = (<p data-test="weather.loading-indicator">Loading...</p>);
  } else {
    content = <WeatherInfo {...weatherInfo} />;
  }

  return (
    <section className="weather-container">
      <Link data-test="weather.back-link" to={routeList.homePage} className="weather-back-link">&larr; Back</Link>
      <div className="weather-city-card">
        <img data-test="weather.city-image" src={getCityImage(city)} alt={city} />
        <div className="weather-city-details">
          <h2 data-test="weather.city-name">Weather in {city}</h2>
          {content}           
        </div>
      </div>
    </section>
  );
};

Weather.propTypes = {
  city: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  shouldLoadInfo: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  weatherInfo: PropTypes.object.isRequired,
  fetchWeatherDetails: PropTypes.func.isRequired
};

export default Weather;