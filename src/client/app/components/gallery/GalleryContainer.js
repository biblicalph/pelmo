import Gallery from 'App/components/gallery/Gallery';
import { fetchGalleryAction } from 'App/redux/gallery';
import { getAllPhotos } from 'App/redux/rootReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const mapStateToProps = (state) => {
  const { meta, photos } = getAllPhotos(state);
  const shouldLoadPhotos = photos.length === 0;

  return {
    errorMessage: meta.errorMessage,
    isFetching: meta.isFetching || shouldLoadPhotos,
    shouldLoadPhotos,
    photos
  };
};



export default withRouter(
  connect(mapStateToProps, { fetchGallery: fetchGalleryAction })(Gallery)
);