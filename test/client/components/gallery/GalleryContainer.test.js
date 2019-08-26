import { mapStateToProps } from "App/components/gallery/GalleryContainer";
import { galleryFixture } from "../../fixtures/gallery";

describe('mapStateToProps', () => {
  let reduxState;
  let allPhotos;

  beforeEach(() => {
    allPhotos = {
      meta: {
        isFetching: false,
        errorMessage: ''
      },
      photos: []
    };
    reduxState = {
      gallery: {
        all: allPhotos
      }
    }
  });

  it('should return the correct props if there are no photos', () => {
    const { meta } = allPhotos;

    expect(mapStateToProps(reduxState)).toEqual({
      errorMessage: meta.errorMessage,
      isFetching: true,
      shouldLoadPhotos: true,
      photos: []
    });
  });

  it('should return the correct props if the are photos', () => {
    allPhotos.photos = galleryFixture;
    reduxState.gallery.all = allPhotos;
    const { meta } = allPhotos;

    expect(mapStateToProps(reduxState)).toEqual({
      errorMessage: meta.errorMessage,
      isFetching: false,
      shouldLoadPhotos: false,
      photos: galleryFixture
    });
  });
});