import Weather from 'App/components/weather/Weather';
import { getWeatherByCity } from 'App/redux/rootReducer';
import { fetchWeatherDetailsAction } from 'App/redux/weather';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const mapStateToProps = (state, { match }) => {
  const { city } = match.params;
  const { meta, ...weatherInfo } = getWeatherByCity(state, city);
  const shouldLoadInfo = Object.keys(weatherInfo).length === 0;

  return {
    city,
    errorMessage: meta.errorMessage,
    isFetching: meta.isFetching || shouldLoadInfo,
    shouldLoadInfo,
    weatherInfo
  };
};



export default withRouter(
  connect(mapStateToProps, { fetchWeatherDetails: fetchWeatherDetailsAction })(Weather)
);