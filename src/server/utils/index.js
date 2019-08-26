
export const randomFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isDevelopment = () => process.env.NODE_ENV === 'development';

export const getBaseUrl = (req) => {
  const url = `${req.protocol}://${req.hostname}`;
  return isDevelopment() ? `${url}:${process.env.PORT}` : url;
};