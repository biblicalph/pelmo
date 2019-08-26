import Weather from 'App/components/weather/Weather';
import WeatherInfo from 'App/components/weatherDetails/WeatherDetails';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { formattedTorontoResponse } from '../../fixtures/weather';

describe('Weather page component spec', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      city: 'toronto',
      errorMessage: '',
      shouldLoadInfo: false,
      isFetching: false,
      weatherInfo: formattedTorontoResponse,
      fetchWeatherDetails: jest.fn()
    };
  });

  it('should render city image', () => {
    wrapper = shallow(<Weather {...props} />);
    expect(wrapper.find('[data-test="weather.city-image"]')).toHaveLength(1);
  });

  it('should render city name', () => {
    wrapper = shallow(<Weather {...props} />);
    const cityName = wrapper.find('[data-test="weather.city-name"]')
    expect(cityName).toHaveLength(1);
    expect(cityName.text()).toContain(props.city);
  });

  describe('Has error', () => {
    beforeEach(() => {
      props.errorMessage = 'Network error';
      wrapper = shallow(<Weather {...props} />);
    });

    it('should render error message', () => {
      expect(wrapper.find('[data-test="weather.error-message"]')).toHaveLength(1);
    });

    it('should not render loading indicator and weather info', () => {
      expect(wrapper.find('[data-test="weather.loading-indicator"]')).toHaveLength(0);
      expect(wrapper.find(WeatherInfo)).toHaveLength(0);
    });
  });

  describe('Is fetching data', () => {
    beforeEach(() => {
      props.isFetching = true;
      wrapper = shallow(<Weather {...props} />);
    });

    it('should render loading indicator', () => {
      expect(wrapper.find('[data-test="weather.loading-indicator"]')).toHaveLength(1);
    });

    it('should not render weather info', () => {
      expect(wrapper.find(WeatherInfo)).toHaveLength(0);
    });
  });

  describe('Has loaded data', () => {
    beforeEach(() => {
      props.shouldLoadInfo = true;
      wrapper = shallow(<Weather {...props} />);
    });

    it('should render weather info', () => {
      const weatherInfo = wrapper.find(WeatherInfo);
      expect(weatherInfo).toHaveLength(1);
      expect(weatherInfo.props()).toEqual(props.weatherInfo);
    });
  });

  it('should invoke "fetchWeatherDetails" if data has not been loaded', () => {
    // shallow doesn't support React hooks yet, hence use of mount
    props.shouldLoadInfo = true;
    mount(
      <Router>
        <Weather {...props} />
      </Router>
    );

    expect(props.fetchWeatherDetails).toHaveBeenCalledTimes(1);
    expect(props.fetchWeatherDetails).toHaveBeenCalledWith(props.city);
  });

  it('should not invoke "fetchWeatherDetails" if data has been loaded', () => {
    props.shouldLoadInfo = false;
    mount(
      <Router>
        <Weather {...props} />
      </Router>
    );

    expect(props.fetchWeatherDetails).toHaveBeenCalledTimes(0);
  });
});