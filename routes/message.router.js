
import express  from 'express';
import { deleteMessage, getMessages, sendMessage } from '../controllers/messages.controller.js';
import { messageSchema, messageValidation } from '../utils/validation.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';

const router = express.Router()


router.post("/" , protectedRoute , messageValidation(messageSchema) ,sendMessage)
router.get("/:message_type", protectedRoute , getMessages)
router.delete("/:id" , protectedRoute , deleteMessage)

export default router