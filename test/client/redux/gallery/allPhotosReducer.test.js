import { receiveGalleryAction, rejectGalleryAction, requestGalleryAction } from 'App/redux/gallery';
import reducer from 'App/redux/gallery/allPhotosReducer';
import { galleryFixture } from '../../fixtures/gallery';

describe('Gallery reducer spec', () => {
  describe('Request gallery', () => {
    const action = requestGalleryAction()
    let state;

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set "isFetching=true"', () => {
      expect(state.meta).toHaveProperty('isFetching', true);
    });

    it(`should set "errorMessage=''"`, () => {
      expect(state.meta).toHaveProperty('errorMessage', '');
    });

    it('should not override the existing data', () => {
      const prevState = {
        photos: galleryFixture
      };
      state = reducer(prevState, action);
      expect(state.photos).toEqual(galleryFixture);
    });
  });

  describe('Receive gallery', () => {
    const action = receiveGalleryAction(galleryFixture)
    let state;

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set "isFetching=false"', () => {
      expect(state.meta).toHaveProperty('isFetching', false);
    });

    it(`should set "errorMessage=''"`, () => {
      expect(state.meta).toHaveProperty('errorMessage', '');
    });

    it(`should add parsed response data to the state`, () => {
      expect(state.photos).toEqual(galleryFixture);
    });
  });

  describe('Reject gallery', () => {
    const errorMessage = 'Network error';
    const action = rejectGalleryAction(errorMessage)
    let state;

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set "isFetching=false"', () => {
      expect(state.meta).toHaveProperty('isFetching', false);
    });

    it('should set the error message', () => {
      expect(state.meta).toHaveProperty('errorMessage', errorMessage);
    });

    it('should not override the existing weather data', () => {
      const prevState = {
        photos: galleryFixture
      };
      state = reducer(prevState, action);
      expect(state.photos).toEqual(prevState.photos);
    });
  });
});