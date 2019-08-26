import * as actions from 'App/redux/gallery/actions';
import { getApiUrl, makeGet } from 'App/utils';

export const requestGalleryAction = () => ({
  type: actions.REQUEST_GALLERY
});

export const receiveGalleryAction = (photos) => ({
  type: actions.RECEIVE_GALLERY,
  photos
});

export const rejectGalleryAction = (errorMessage) => ({
  type: actions.REJECT_GALLERY,
  errorMessage
});

export const requestPhotoAction = (photoId) => ({
  type: actions.REQUEST_PHOTO,
  photoId
});

export const receivePhotoAction = (photo) => ({
  type: actions.RECEIVE_PHOTO,
  photo
});

export const rejectPhotoAction = ({photoId, errorMessage}) => ({
  type: actions.REJECT_PHOTO,
  errorMessage,
  photoId
});

export const fetchGalleryAction = () => {
  return async (dispatch) => {
    dispatch(requestGalleryAction());

    try {
      const resp = await makeGet({ url: getApiUrl({ path: 'photos' }) });

      dispatch(receiveGalleryAction(resp.data));
    } catch (error) {
      dispatch(rejectGalleryAction(error.message));
    }
  };
};

export const fetchPhotoAction = (photoId) => {
  return async (dispatch) => {
    dispatch(requestPhotoAction(photoId));

    try {
      const resp = await makeGet({ url: getApiUrl({ path: `photos/${photoId}` })});

      dispatch(receivePhotoAction(resp.data));
    } catch (error) {
      dispatch(rejectPhotoAction({ photoId, errorMessage: error.message }));
    }
  };
};


