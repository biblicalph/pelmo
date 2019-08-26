import { formattedTorontoResponse } from "../../fixtures/weather";
import { mapStateToProps } from "App/components/weather/WeatherContainer";

describe('mapStateToProps', () => {
  let ownProps;
  let reduxState;

  beforeEach(() => {
    ownProps = {
      match: {
        params: { city: 'toronto' }
      }
    };
    reduxState = {
      weather: {
        toronto: {
          ...formattedTorontoResponse,
          meta: {
            isFetching: false,
            errorMessage: ''
          }
        }
      }
    };
  });

  it('should return the correct props based on current state and own props', () => {
    const cityWeather = reduxState.weather.toronto;
    const { meta, ...weatherInfo } = cityWeather;

    expect(mapStateToProps(reduxState, ownProps)).toEqual({
      city: ownProps.match.params.city,
      errorMessage: meta.errorMessage,
      isFetching: meta.isFetching,
      shouldLoadInfo: false,
      weatherInfo
    });
  });
});