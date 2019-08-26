import { Router } from 'express';
import * as actions from './actions';

const router = Router();

router.post('/', actions.contactUs);

export default router;