import * as actions from 'App/redux/gallery/actions';

const meta = {
  isFetching: false,
  errorMessage: ''
};

const handleRequestPhoto = (state, action) => {
  const { photoId } = action;
  const photo = state[photoId] || {};
  return {
    ...state,
    [photoId]: {
      ...photo,
      meta: {
        ...meta,
        isFetching: true
      }
    }
  };
};

const handleReceivePhoto = (state, action) => {
  const { photo } = action;

  return {
    ...state,
    [photo.id]: {
      ...photo,
      meta
    }
  }
};

const handleRejectPhoto = (state, action) => {
  const { photoId, errorMessage } = action;
  const photo = state[action.photoId] || {};
  
  return {
    ...state,
    [photoId]: {
      ...photo,
      meta: {
        ...meta,
        errorMessage
      }
    }
  }
};

const photosById = (state = {}, action) => {
  switch (action.type) {
    case actions.REQUEST_PHOTO: 
      return handleRequestPhoto(state, action);
    case actions.RECEIVE_PHOTO:
      return handleReceivePhoto(state, action);
    case actions.REJECT_PHOTO:
      return handleRejectPhoto(state, action);
    default: 
      return state;
  }
};

export default photosById;
export const photoInitialState = { meta };