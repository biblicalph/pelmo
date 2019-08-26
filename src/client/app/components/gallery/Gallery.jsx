import 'App/components/gallery/gallery.css';
import { galleryDetailUrl, useSetPageTitle } from 'App/utils';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const GalleryItem = ({url, title, photoId}) => {
  return (
    <Link className="gallery-item" to={galleryDetailUrl(photoId)}>
      <div>
        <img className="gallery-image" src={url} alt={title} />
        <div className="gallery-item-footer">{title}</div>
      </div>
    </Link>
  )
};
GalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photoId: PropTypes.number.isRequired
};

const GalleryPhotos = ({
  photos
}) => {
  return (
    <React.Fragment>
      {photos.map((photo) => {
        return (<GalleryItem 
          key={photo.id} 
          photoId={photo.id} 
          url={photo.thumbUrl} 
          title={photo.description || 'Gallery Image'} />)
      })}
    </React.Fragment>
  );
};
GalleryPhotos.propTypes = {
  photos: PropTypes.array.isRequired
};

const Gallery = ({
  errorMessage,
  isFetching,
  fetchGallery,
  photos,
  shouldLoadPhotos
}) => {
  useSetPageTitle('Gallery');
  useEffect(() => {
    if (shouldLoadPhotos) {
      fetchGallery();
    }
  }, [shouldLoadPhotos]);

  let content;
  if (errorMessage) {
    content = (<p data-test="gallery.error-message">{errorMessage}</p>);
  } else if (isFetching) {
    content = (<p data-test="gallery.loading-indicator">Loading...</p>);
  } else {
    content = <GalleryPhotos photos={photos} />;
  }
  
  return (
    <section className="gallery-container">
      {content}
    </section>
  )
};

export default Gallery;