import * as actionCreators from "App/redux/gallery/actionCreators";
import * as actions from "App/redux/gallery/actions";
import * as request from "App/utils/request";
import { galleryFixture } from "../../fixtures/gallery";

const photoId = 1;

describe('Gallery action creators spec', () => {
  describe('requestGalleryAction', () => {
    it('should return an object with the correct fields', () => {
      expect(actionCreators.requestGalleryAction()).toEqual({
        type: actions.REQUEST_GALLERY
      });
    });
  });
  describe('receiveGalleryAction', () => {
    it('should return an object with the correct fields', () => {
      expect(actionCreators.receiveGalleryAction(galleryFixture)).toEqual({
        type: actions.RECEIVE_GALLERY,
        photos: galleryFixture
      });
    });
  });
  describe('rejectGalleryAction', () => {
    it('should return an object with the correct fields', () => {
      const errorMessage = 'Bad error';
      expect(actionCreators.rejectGalleryAction(errorMessage)).toEqual({
        type: actions.REJECT_GALLERY,
        errorMessage
      });
    });
  });

  describe('requestPhotoAction', () => {
    it('should return an object with the correct fields', () => {
      expect(actionCreators.requestPhotoAction(photoId)).toEqual({
        type: actions.REQUEST_PHOTO,
        photoId
      });
    });
  });
  describe('receivePhotoAction', () => {
    it('should return an object with the correct fields', () => {
      expect(actionCreators.receivePhotoAction(galleryFixture[0])).toEqual({
        type: actions.RECEIVE_PHOTO,
        photo: galleryFixture[0]
      });
    });
  });
  describe('rejectPhotoAction', () => {
    it('should return an object with the correct fields', () => {
      const errorMessage = 'Bad error';
      expect(actionCreators.rejectPhotoAction({errorMessage, photoId})).toEqual({
        type: actions.REJECT_PHOTO,
        errorMessage,
        photoId
      });
    });
  });

  describe('fetchGalleryAction', () => {
    const error = new Error('Network Error');
    const dispatchMock = jest.fn();
    let getMock = jest.spyOn(request, 'makeGet');
    let fetchThunk;

    beforeEach(async () => {
      dispatchMock.mockClear();
      getMock.mockClear();
      getMock.mockImplementation(() => Promise.resolve({ data: galleryFixture }));
      fetchThunk = actionCreators.fetchGalleryAction();
    });

    it('should return a thunk action', () => {
      expect(fetchThunk).toEqual(expect.any(Function));
    });

    describe('Fetch thunk', () => {
      beforeEach(async () => {
        await fetchThunk(dispatchMock);
      });

      it('should dispatch "requestGalleryAction"', () => {
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.requestGalleryAction());
      });
  
      it('should make get request with the correct argument', () => {
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith({
          url: expect.stringContaining('photos')
        });
      });
  
      it('should dispatch "receiveGalleryAction" on api call success', () => {
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.receiveGalleryAction(galleryFixture));
      });
  
      it('should dispatch "rejectGalleryAction" on api call failure', async () => {
        expect.assertions(1);
        getMock.mockImplementationOnce(() => Promise.reject(error));
        await fetchThunk(dispatchMock);
  
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.rejectGalleryAction(error.message));
      });
    });
  });

  describe('fetchPhotoAction', () => {
    const error = new Error('Network Error');
    const dispatchMock = jest.fn();
    let getMock = jest.spyOn(request, 'makeGet');
    let fetchThunk;

    beforeEach(async () => {
      dispatchMock.mockClear();
      getMock.mockClear();
      getMock.mockImplementation(() => Promise.resolve({ data: galleryFixture[0] }));
      fetchThunk = actionCreators.fetchPhotoAction(photoId);
    });

    it('should return a thunk action', () => {
      expect(fetchThunk).toEqual(expect.any(Function));
    });

    describe('Fetch thunk', () => {
      beforeEach(async () => {
        await fetchThunk(dispatchMock);
      });

      it('should dispatch "requestPhotoAction"', () => {
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.requestPhotoAction(photoId));
      });
  
      it('should make get request with the correct argument', () => {
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith({
          url: expect.stringContaining(`photos/${photoId}`)
        });
      });
  
      it('should dispatch "receivePhotoAction" on api call success', () => {
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.receivePhotoAction(galleryFixture[0]));
      });
  
      it('should dispatch "rejectPhotoAction" on api call failure', async () => {
        expect.assertions(1);
        getMock.mockImplementationOnce(() => Promise.reject(error));
        await fetchThunk(dispatchMock);
  
        expect(dispatchMock).toHaveBeenCalledWith(actionCreators.rejectPhotoAction({
          errorMessage: error.message,
          photoId
        }));
      });
    });
  });
});