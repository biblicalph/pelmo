import gallery, { getAllPhotos as getGalleryPhotos, getPhoto as getGalleryPhoto } from 'App/redux/gallery';
import weather, { getCityWeather } from 'App/redux/weather';
import { combineReducers } from 'redux';

export default combineReducers({
  gallery,
  weather
});

// Utilities to keep clients agnostic of redux data structure
export const getAllPhotos = (state) => getGalleryPhotos(state.gallery);
export const getPhoto = (state, photoId) => getGalleryPhoto(state.gallery, photoId);
export const getWeatherByCity = (state, city) => getCityWeather(state.weather, city);