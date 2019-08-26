import reducer, { 
  requestWeatherDetailsAction,
  receiveWeatherDetailsAction, 
  rejectWeatherDetailsAction  
} from 'App/redux/weather';
import { torontoResponse } from '../../fixtures/weather';

const toronto = 'toronto';

describe('Weather reducer spec', () => {
  describe('Request weather details', () => {
    const torontoAction = requestWeatherDetailsAction(toronto);
    let state;

    beforeEach(() => {
      state = reducer(undefined, torontoAction);
    });

    it('should set "isFetching=true"', () => {
      expect(state.toronto.meta).toHaveProperty('isFetching', true);
    });

    it(`should set "errorMessage=''"`, () => {
      expect(state.toronto.meta).toHaveProperty('errorMessage', '');
    });

    it('should not override the existing weather data', () => {
      const prevState = {
        toronto: {
          ...torontoResponse
        }
      };
      state = reducer(prevState, torontoAction);
      expect(state.toronto).toEqual(expect.objectContaining(torontoResponse));
    });
  });

  describe('Receive weather details', () => {
    const torontoAction = receiveWeatherDetailsAction({ 
      city: toronto,
      data: torontoResponse
    })
    let state;

    beforeEach(() => {
      state = reducer(undefined, torontoAction);
    });

    it('should set "isFetching=false"', () => {
      expect(state.toronto.meta).toHaveProperty('isFetching', false);
    });

    it(`should set "errorMessage=''"`, () => {
      expect(state.toronto.meta).toHaveProperty('errorMessage', '');
    });

    it(`should add parsed response data to the state`, () => {
      expect(state.toronto).toEqual({
        condition: torontoResponse.wxcondition,
        updatedAt: torontoResponse.updatetime,
        updatedAtTimestamp: torontoResponse.updatetime_stamp_gmt,
        icon: torontoResponse.icon,
        temperature: torontoResponse.temperature,
        feelsLike: torontoResponse.feels_like,
        temperatureUnit: torontoResponse.temperature_unit,
        meta: expect.any(Object)
      });
    });
  });

  describe('Reject weather details', () => {
    const errorMessage = 'Network error';
    const torontoAction = rejectWeatherDetailsAction({ 
      city: toronto,
      errorMessage
    })
    let state;

    beforeEach(() => {
      state = reducer(undefined, torontoAction);
    });

    it('should set "isFetching=false"', () => {
      expect(state.toronto.meta).toHaveProperty('isFetching', false);
    });

    it('should set the error message', () => {
      expect(state.toronto.meta).toHaveProperty('errorMessage', errorMessage);
    });

    it('should not override the existing weather data', () => {
      const prevState = {
        toronto: {
          ...torontoResponse
        }
      };
      state = reducer(prevState, torontoAction);
      expect(state.toronto).toEqual(expect.objectContaining({
        ...prevState.toronto,
        meta: expect.any(Object)
      }));
    });
  });
});