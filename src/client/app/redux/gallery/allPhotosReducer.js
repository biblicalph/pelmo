import * as actions from 'App/redux/gallery/actions';

const meta = {
  isFetching: false,
  errorMessage: ''
};
const allPhotosInitState = {
  photos: [],
  meta
};

const handleRequestGallery = (state) => ({
  ...state,
  meta: {
    ...meta,
    isFetching: true
  }
});

const handleReceiveGallery = (_, action) => {
  return {
    photos: action.photos,
    meta
  }
};

const handleRejectGallery = (state, action) => ({
  ...state,
  meta: {
    ...meta,
    errorMessage: action.errorMessage
  }
});

const allPhotos = (state = allPhotosInitState, action) => {
  switch (action.type) {
    case actions.REQUEST_GALLERY:
      return handleRequestGallery(state, action);
    case actions.RECEIVE_GALLERY:
      return handleReceiveGallery(state, action);
    case actions.REJECT_GALLERY:
      return handleRejectGallery(state, action);
    default:
        return state;
  }
};
export default allPhotos;