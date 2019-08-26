import * as actions from 'App/redux/weather/actions';

const meta = {
  isFetching: false,
  errorMessage: ''
};
const initialState = {
  toronto: { meta },
  montreal: { meta }
};

const handleRequestWeatherDetails = (state, action) => {
  const { city } = action;
  const stateByCity = state[city];

  return {
    ...state,
    [city]: {
      ...stateByCity,
      meta: {
        ...stateByCity.meta,
        isFetching: true,
        errorMessage: ''
      }
    }
  }
};

const handleReceiveWeatherDetails = (state, action) => {
  const { city, data } = action;

  return {
    ...state,
    [city]: {
      ...{
        condition: data.wxcondition,
        feelsLike: data.feels_like,
        icon: data.icon,
        temperature: data.temperature,
        temperatureUnit: data.temperature_unit,
        updatedAt: data.updatetime,
        updatedAtTimestamp: data.updatetime_stamp_gmt
      },
      meta
    }
  };
};

const handleRejectWeatherDetails = (state, action) => {
  const { city, errorMessage } = action;
  const stateByCity = state[city];

  return {
    ...state,
    [city]: {
      ...stateByCity,
      meta: {
        ...stateByCity.meta,
        isFetching: false,
        errorMessage
      }
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_WEATHER_DETAILS:
      return handleRequestWeatherDetails(state, action);
    case actions.RECEIVE_WEATHER_DETAILS:
      return handleReceiveWeatherDetails(state, action);
    case actions.REJECT_WEATHER_DETAILS:
      return handleRejectWeatherDetails(state, action);
    default: 
      return state;
  }
};

export default reducer;

export const getCityWeather = (state, city) => state[city] || { meta };