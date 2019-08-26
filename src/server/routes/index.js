
import { Router } from 'express';
import contactRoutes from './contact';
import photosRoutes from './photos';

const router = Router();

router.use('/photos', photosRoutes);
router.use('/contact-us', contactRoutes);
router.get('/', (_, res) => {
  return res.status(200).send({ message: 'Welcome to weather api' });
});

export default router;