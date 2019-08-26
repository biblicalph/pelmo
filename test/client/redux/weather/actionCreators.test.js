import * as actionCreators from "App/redux/weather/actionCreators";
import { RECEIVE_WEATHER_DETAILS, REJECT_WEATHER_DETAILS, REQUEST_WEATHER_DETAILS } from "App/redux/weather/actions";
import * as request from "App/utils/request";
import { formattedTorontoResponse } from "../../fixtures/weather";

const city = 'toronto';

describe('Weather action creators spec', () => {
  describe('requestWeatherDetailsAction', () => {
    it('should return an object with the correct fields', () => {
      expect(actionCreators.requestWeatherDetailsAction(city)).toEqual({
        type: REQUEST_WEATHER_DETAILS,
        city
      });
    });
  });
  describe('receiveWeatherDetailsAction', () => {
    it('should return an object with the correct fields', () => {
      expect(actionCreators.receiveWeatherDetailsAction({ city, data: {} })).toEqual({
        type: RECEIVE_WEATHER_DETAILS,
        city,
        data: {}
      });
    });
  });
  describe('rejectWeatherDetailsAction', () => {
    it('should return an object with the correct fields', () => {
      expect(actionCreators.rejectWeatherDetailsAction({ city, errorMessage: 'Some' })).toEqual({
        type: REJECT_WEATHER_DETAILS,
        city,
        errorMessage: 'Some'
      });
    });
  });
  describe('fetchWeatherDetailsAction', () => {
    const error = new Error('Network Error');
    const dispatchMock = jest.fn();
    let getMock = jest.spyOn(request, 'makeGet');
    let fetchThunk;

    beforeEach(async () => {
      dispatchMock.mockClear();
      getMock.mockClear();
      getMock.mockImplementation(() => Promise.resolve(formattedTorontoResponse));
      fetchThunk = actionCreators.fetchWeatherDetailsAction(city);
    });

    it('should return a thunk action', () => {
      expect(fetchThunk).toEqual(expect.any(Function));
    });

    describe('Fetch thunk', () => {
      beforeEach(async () => {
        await fetchThunk(dispatchMock);
      });

      it('should dispatch "requestWeatherDetailsAction"', () => {
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.requestWeatherDetailsAction(city));
      });
  
      it('should make get request with the correct argument', () => {
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith({
          url: request.getWeatherUrl(city)
        });
      });
  
      it('should dispatch "receiveWeatherDetailsAction" on api call success', () => {
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.receiveWeatherDetailsAction({ 
          city, 
          data: formattedTorontoResponse 
        }));
      });
  
      it('should dispatch "rejectWeatherDetailsAction" on api call failure', async () => {
        expect.assertions(1);
        getMock.mockImplementationOnce(() => Promise.reject(error));
        await fetchThunk(dispatchMock);
  
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.rejectWeatherDetailsAction({ 
          city, 
          errorMessage: error.message 
        }));
      });
    });
  });
});