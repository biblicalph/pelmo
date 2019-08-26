export const routeList = {
  homePage: '/',
  contactUs: '/contact',
  gallery: '/gallery',
  galleryDetail: '/gallery/:photoId',
  weather: '/weather/:city' 
};
export const galleryDetailUrl = (photoId) => routeList.galleryDetail.replace(':photoId', photoId);
export const cityWeatherUrl = (city) => routeList.weather.replace(':city', city.toLowerCase());
