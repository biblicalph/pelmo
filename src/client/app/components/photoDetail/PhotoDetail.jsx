import 'App/components/photoDetail/photoDetail.css';
import { routeList } from 'App/utils';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PhotoDetail = ({
  errorMessage,
  fetchPhoto,
  isFetching,
  photo,
  photoId,
  shouldFetchPhoto
}) => {
  let content;

  useEffect(() => {
    if (shouldFetchPhoto) {
      fetchPhoto(photoId);
    }
  }, [photoId, shouldFetchPhoto])

  if (errorMessage) {
    content = (<span className="photo-detail-error">{errorMessage}</span>);
  } else if (isFetching) {
    content = (<span className="photo-detail-loading-indicator">Loading...</span>);
  } else if (photo) {
    content = (
      <React.Fragment>
        <img src={photo.fullUrl} alt={photo.description} />
        <span>{photo.description}</span>
      </React.Fragment>
    );
  } else {
    <span>Nothing to here</span>
  }
  
  return (
    <div className="photo-detail">
      {!isFetching && (
        <Link 
          data-test="weather.back-link" 
          to={routeList.gallery} 
          className="weather-back-link">&larr; Back</Link>)}
      {content}
    </div>
  );
};

export default PhotoDetail;