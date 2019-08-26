import { Router } from 'express';
import * as actions from './actions';

const router = Router();

router.get('/:photoId', actions.getPhoto)
router.get('/', actions.getAllPhotos);

export default router;