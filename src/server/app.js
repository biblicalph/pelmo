import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
const assetPath = path.join(__dirname, 'assets');

app.use(express.json());
app.use(cors());
// server static files from assets directory
app.use(express.static(assetPath));
app.use('/api/v1', routes);
// 404 middleware
app.use((_, res) => {
  return res.status(404).send({ message: 'The resource does not exist' });
});
app.use((err, _, res) => {
  console.error(err);
  return res.status(500).send({ message: 'An internal error occurred. We are looking into it. Return shortly' });
});

export default app;
