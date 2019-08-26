export const galleryFixture = Array.from({length: 5}).map((_, i) => {
  const id = i + 1;
  return {
    id,
    thumbUrl: `http://localhost:8080/api/photos/${id}/thumb`,
    fullUrl: `http://localhost:8080/api/photos/${id}/full`
  }
});