import * as actions from 'App/redux/weather/actions';
import { getWeatherUrl, makeGet } from 'App/utils';

export const requestWeatherDetailsAction = (city) => ({
  type: actions.REQUEST_WEATHER_DETAILS,
  city
});

export const receiveWeatherDetailsAction = ({ city, data }) => ({
  type: actions.RECEIVE_WEATHER_DETAILS,
  city,
  data
});

export const rejectWeatherDetailsAction = ({ city, errorMessage }) => ({
  type: actions.REJECT_WEATHER_DETAILS,
  city,
  errorMessage
});

export const fetchWeatherDetailsAction = (city) => {
  return async (dispatch) => {
    dispatch(requestWeatherDetailsAction(city));

    try {
      const data = await makeGet({ url: getWeatherUrl(city) });

      dispatch(receiveWeatherDetailsAction({ city, data }));
    } catch (error) {
      dispatch(rejectWeatherDetailsAction({ city, errorMessage: error.message }));
    }
  }
};
