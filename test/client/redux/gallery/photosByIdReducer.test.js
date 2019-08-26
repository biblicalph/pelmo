import { receivePhotoAction, rejectPhotoAction, requestPhotoAction } from 'App/redux/gallery';
import reducer from 'App/redux/gallery/photosByIdReducer';
import { galleryFixture } from '../../fixtures/gallery';

const photoId = 1;

describe('Photos by id reducer spec', () => {
  describe('Request photo action', () => {
    const action = requestPhotoAction(photoId)
    let state;

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set "isFetching=true"', () => {
      expect(state[photoId].meta).toHaveProperty('isFetching', true);
    });

    it(`should set "errorMessage=''"`, () => {
      expect(state[photoId].meta).toHaveProperty('errorMessage', '');
    });

    it('should not override the existing data', () => {
      const prevState = {
        [photoId]: galleryFixture[0]
      };
      const state = reducer(prevState, action);
      expect(state).toEqual({
        [photoId]: expect.objectContaining({...galleryFixture[0]})
      });
    });
  });

  describe('Receive photo action', () => {
    const action = receivePhotoAction(galleryFixture[0])
    let state;

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set "isFetching=false"', () => {
      expect(state[photoId].meta).toHaveProperty('isFetching', false);
    });

    it(`should set "errorMessage=''"`, () => {
      expect(state[photoId].meta).toHaveProperty('errorMessage', '');
    });

    it(`should add parsed response data to the state`, () => {
      expect(state[photoId]).toEqual(expect.objectContaining({...galleryFixture[0]}));
    });
  });

  describe('Reject photo action', () => {
    const errorMessage = 'Network error';
    const action = rejectPhotoAction({photoId, errorMessage})
    let state;

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set "isFetching=false"', () => {
      expect(state[photoId].meta).toHaveProperty('isFetching', false);
    });

    it('should set the error message', () => {
      expect(state[photoId].meta).toHaveProperty('errorMessage', errorMessage);
    });

    it('should not override the existing weather data', () => {
      const prevState = {
        [photoId]: galleryFixture[0]
      };
      state = reducer(prevState, action);
      expect(state[photoId]).toEqual(expect.objectContaining({...galleryFixture[0]}));
    });
  });
});