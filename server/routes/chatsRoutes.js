import { Router } from 'express';
import { getChats } from '../controllers/chatsController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getChats);

export default router;
