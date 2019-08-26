import allPhotos from 'App/redux/gallery/allPhotosReducer';
import photosById, { photoInitialState } from 'App/redux/gallery/photosByIdReducer';
import { combineReducers } from "redux";

export default combineReducers({
  byId: photosById,
  all: allPhotos
});

export const getPhoto = (state, photoId) => {
  // load from all photos if available
  const photo = state.all.photos.find(({ id }) => id === photoId);

  return photo || state.byId[photoId] || photoInitialState;
};
export const getAllPhotos = (state) => state.all;