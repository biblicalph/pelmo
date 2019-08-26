import PhotoDetail from 'App/components/photoDetail/PhotoDetail';
import { fetchPhotoAction } from 'App/redux/gallery';
import { getPhoto } from 'App/redux/rootReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const mapStateToProps = (state, { match }) => {
  const { photoId } = match.params;
  const { meta, ...photo } = getPhoto(state, photoId);
  const shouldFetchPhoto = Object.keys(photo).length === 0;

  return {
    photo,
    photoId,
    shouldFetchPhoto,
    isFetching: shouldFetchPhoto || meta.isFetching,
    errorMessage: meta.errorMessage
  };
};



export default withRouter(
  connect(mapStateToProps, { fetchPhoto: fetchPhotoAction })(PhotoDetail)
);