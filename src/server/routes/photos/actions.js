import * as faker from 'faker';
import { getBaseUrl, randomFromInterval } from "../../utils/index";

const photoGenerator = (req) => {
  const baseUrl = getBaseUrl(req);

  return (id) => {
    const randNum = randomFromInterval(1, 5);
    return {
      id,
      thumbUrl: `${baseUrl}/images/thumb/${randNum}.jpg`,
      fullUrl: `${baseUrl}/images/${id}.jpg`,
      description: faker.lorem.words(3)
    }
  };
};

export const getAllPhotos = (req, res) => {
  const generatePhoto = photoGenerator(req);

  const photos = Array.from({length: 10}).map((_, index) => generatePhoto(index + 1));

  return res.status(200).json({
    data: photos
  });
};

export const getPhoto = (req, res) => {
  const { photoId } = req.params;
  const generatePhoto = photoGenerator(req);

  return res.status(200).json({
    data: generatePhoto(Number(photoId))
  });
};