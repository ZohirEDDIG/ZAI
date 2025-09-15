import { Router } from 'express';
import { deleteChat, saveChat, renameChat, updateChat } from '../controllers/chatController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/save', authenticate, saveChat);
router.patch('/update/:chatId', authenticate, updateChat);
router.delete('/delete/:chatId', authenticate, deleteChat);
router.patch('/rename/:chatId', authenticate, renameChat);

export default router;